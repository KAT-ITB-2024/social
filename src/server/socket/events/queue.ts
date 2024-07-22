import { z } from 'zod';
import { createEvent } from '../helper';
import { type UserQueue } from '~/types/payloads/message';
import { findMatch, generateQueueKey } from '../messaging/queue';
import { type UserMatch, userMatches } from '@katitb2024/database';
import { Redis } from '~/server/redis';
import { generateKey } from 'crypto';
import { eq, or } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const findMatchEvent = createEvent(
  {
    name: 'findMatch',
    input: z.object({
      isAnonymous: z.boolean(),
    }),
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

export const checkMatchEvent = createEvent(
  {
    name: 'checkMatch',
    authRequired: true,
    input: undefined,
  },
  async ({ ctx }) => {
    const userQueue = await Redis.getClient().get(
      generateQueueKey(ctx.client.data.session.user.id),
    );

    const result: {
      queue: null | UserQueue;
      match: undefined | UserMatch;
    } = {
      queue: null,
      match: undefined,
    };

    // Kasus kalau dia belum dapet match, jadi queue nya ga null
    if (!userQueue) {
      result.match = undefined;
      return result;
    }

    // Kasus kalau dia baru aja match
    if (!ctx.client.data.match) {
      const userId = ctx.client.data.session.user.id;
      const userMatch = await ctx.drizzle.query.userMatches.findFirst({
        where: or(
          eq(userMatches.firstUserId, userId),
          eq(userMatches.secondUserId, userId),
        ),
      });
      result.match = userMatch;
    }

    ctx.client.data.matchQueue = null;
    result.match = ctx.client.data.match;
    return result;
  },
);
