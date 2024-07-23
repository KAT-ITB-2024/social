import { z } from 'zod';
import { createEvent } from '../helper';
import { and, eq, or } from 'drizzle-orm';
import { messages, userMatches } from '@katitb2024/database';
export const messageEvent = createEvent(
  {
    name: 'message',
    input: z.object({
      message: z.string().min(1),
      receiverId: z.string().min(1),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    const userSession = ctx.client.data.session;
    const senderId = userSession.user.id;
    const receiverId = input.receiverId;

    let roomChat =
      ctx.client.data.roomChat.get(receiverId) ??
      (await ctx.drizzle.query.userMatches.findFirst({
        where: or(
          and(
            eq(userMatches.firstUserId, senderId),
            eq(userMatches.secondUserId, receiverId),
          ),
          and(
            eq(userMatches.secondUserId, senderId),
            eq(userMatches.firstUserId, receiverId),
          ),
        ),
      }));

    if (!roomChat) {
      const result = await ctx.drizzle
        .insert(userMatches)
        .values({
          firstUserId: senderId,
          secondUserId: receiverId,
          topic: '',
        })
        .returning();
      if (result[0]) {
        roomChat = result[0];
        ctx.client.data.roomChat.set(receiverId, roomChat);
      } else {
        return;
      }
    }

    const insertResult = await ctx.drizzle
      .insert(messages)
      .values({
        senderId: senderId,
        receiverId: receiverId,
        userMatchId: roomChat.id,
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
