import { z } from 'zod';
import { createEvent } from '../helper';
import { type UserQueue } from '~/types/payloads/message';
import { findMatch } from '../messaging/queue';
import { userMatches } from '@katitb2024/database';

export const findMatchEvent = createEvent(
  {
    name: 'findMatch',
    input: z.object({}),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    if (ctx.client.data.matchQueue) {
      return;
    }
    const userSession = ctx.client.data.session;
    const userQueue: UserQueue = {
      userId: userSession.user.id,
    };

    const matchResult = await findMatch(userQueue);

    if (!matchResult) {
      for (const otherSocket of await ctx.io
        .in(userSession.user.id)
        .fetchSockets()) {
        otherSocket.data.matchQueue = userQueue;
      }
      return;
    }

    const match = await ctx.drizzle
      .insert(userMatches)
      .values({
        firstUserId: matchResult.firstPair.userId,
        secondUserId: matchResult.secondPair.userId,
      })
      .returning();

    const result = match[0];
    if (!result) {
      return;
    }
    for (const otherSocket of await ctx.io
      .in([matchResult.firstPair.userId, matchResult.secondPair.userId])
      .fetchSockets()) {
      otherSocket.data.match = result;
    }

    ctx.io.to([result.firstUserId, result.secondUserId]).emit('match', result);
  },
);
