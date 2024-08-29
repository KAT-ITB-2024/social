import { z } from 'zod';
import { createEvent } from '../helper';
import { findMatch, generateQueueKey, cancelQueue } from '../messaging/queue';
import { profiles, type UserMatch, userMatches } from '@katitb2024/database';
import { Redis } from '~/server/redis';
import { and, eq, isNull, or } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { ChatTopic, GenderEnum } from '~/types/enum/chat';
import { type UserQueue } from '~/types/payloads/message';

export const findMatchEvent = createEvent(
  {
    name: 'findMatch',
    input: z.object({
      isAnonymous: z.boolean(),
      topic: z.nativeEnum(ChatTopic),
      isFindingFriend: z.boolean(),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    if (ctx.client.data.matchQueue) {
      return;
    }
    const userSession = ctx.client.data.session;
    const profile = await ctx.drizzle
      .select({ gender: profiles.gender })
      .from(profiles)
      .where(eq(profiles.userId, userSession.user.id));
    if (!profile[0]) {
      return new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Profile not found',
      });
    }

    const userQueue: UserQueue = {
      userId: userSession.user.id,
      ...input,
      gender:
        profile[0].gender === 'Male' ? GenderEnum.MALE : GenderEnum.FEMALE,
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
        topic: '',
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
    console.log('masuk check match');
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
    if (userQueue) {
      result.queue = JSON.parse(userQueue) as UserQueue;
      result.match = undefined;
      return result;
    }

    if (!ctx.client.data.match) {
      const userId = ctx.client.data.session.user.id;
      console.log(userId);
      const userMatch = await ctx.drizzle
        .select()
        .from(userMatches)
        .where(
          and(
            or(
              eq(userMatches.firstUserId, userId),
              eq(userMatches.secondUserId, userId),
            ),
            isNull(userMatches.endedAt),
          ),
        )
        .execute();

      console.log(userMatch);
      ctx.client.data.match = userMatch[0];
    }

    ctx.client.data.matchQueue = null;
    result.match = ctx.client.data.match;
    return result;
  },
);

export const endMatchEvent = createEvent(
  {
    name: 'endMatch',
    authRequired: true,
    input: undefined,
  },
  async ({ ctx }) => {
    const currentMatch = ctx.client.data.match;
    console.log('Masuk');
    if (!currentMatch) return;

    const result = await ctx.drizzle
      .update(userMatches)
      .set({ endedAt: new Date() })
      .where(eq(userMatches.id, currentMatch.id))
      .returning();

    const match = result[0];
    if (!match) {
      return;
    }
    const sockets = await ctx.io
      .in([match.firstUserId, match.secondUserId])
      .fetchSockets();

    for (const otherSocket of sockets) {
      otherSocket.data.match = undefined;
    }

    ctx.io.to([match.firstUserId, match.secondUserId]).emit('endMatch', match);
  },
);

export const cancelMatchEvent = createEvent(
  {
    name: 'cancelMatch',
    authRequired: true,
    input: undefined,
  },
  async ({ ctx }) => {
    const queue = ctx.client.data.matchQueue;

    if (!queue) {
      return;
    }

    await cancelQueue(queue);

    const sockets = await ctx.io
      .in(ctx.client.data.session.user.id)
      .fetchSockets();

    for (const otherSocket of sockets) {
      otherSocket.data.matchQueue = null;
    }
  },
);
