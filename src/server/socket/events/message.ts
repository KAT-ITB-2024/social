import { z } from 'zod';
import { createEvent } from '../helper';
import { and, eq, or } from 'drizzle-orm';
import { messages, userMatches } from '@katitb2024/database';
import { RevealStatusEvent } from '~/types/payloads/message';
export const messageEvent = createEvent(
  {
    name: 'message',
    input: z.object({
      message: z.string().min(1),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    console.log('MASUK KE MESSAGE EVENT');
    const userSession = ctx.client.data.session;
    const senderId = userSession.user.id;
    const currentMatch = ctx.client.data.match;
    if (!currentMatch) {
      return;
    }
    const receiverId =
      currentMatch.firstUserId === senderId
        ? currentMatch.secondUserId
        : currentMatch.firstUserId;

    const insertResult = await ctx.drizzle
      .insert(messages)
      .values({
        senderId: senderId,
        receiverId: receiverId,
        userMatchId: currentMatch.id,
        content: input.message,
      })
      .returning();

    const message = insertResult[0];
    if (!message) {
      return;
    }

    ctx.io.to([message.senderId, message.receiverId]).emit('add', message);
    return message;
  },
);

export const isTypingEvent = createEvent(
  {
    name: 'isTyping',
    input: z.object({ receiverId: z.string().uuid() }),
    authRequired: true,
  },
  ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    ctx.io.to([input.receiverId]).emit('isTyping', user.id);
  },
);

export const askRevealEvent = createEvent(
  {
    name: 'askReveal',
    input: z.object({ state: z.nativeEnum(RevealStatusEvent) }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    const userId = user.id;
    const currentMatch = ctx.client.data.match;

    if (currentMatch === undefined) return;

    const receiverId =
      currentMatch.firstUserId === userId
        ? currentMatch.secondUserId
        : currentMatch.firstUserId;

    if (input.state === RevealStatusEvent.ASK) {
      ctx.io
        .to([receiverId])
        .emit('askReveal', currentMatch, RevealStatusEvent.ASK);
    } else if (input.state === RevealStatusEvent.ACCEPTED) {
      const result = await ctx.drizzle
        .update(userMatches)
        .set({ isRevealed: true })
        .where(eq(userMatches.id, currentMatch.id))
        .returning();

      if (result?.[0] === undefined) {
        return;
      }
      ctx.io
        .to([userId, receiverId])
        .emit('askReveal', result[0], RevealStatusEvent.ACCEPTED);
    } else {
      ctx.io
        .to([receiverId])
        .emit('askReveal', currentMatch, RevealStatusEvent.REJECTED);
    }
  },
);
