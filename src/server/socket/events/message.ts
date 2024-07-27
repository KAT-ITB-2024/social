import { z } from 'zod';
import { createEvent } from '../helper';
import { and, eq, or } from 'drizzle-orm';
import { messages, userMatches } from '@katitb2024/database';
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
