import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { and, desc, eq, inArray, isNotNull, or, sql } from 'drizzle-orm';
import { messages, users, profiles, userMatches } from '@katitb2024/database';
import { z } from 'zod';
import { alias } from 'drizzle-orm/pg-core';
import {
  createMessagePayload,
  sendMessagePayload,
  type ChatHeader,
} from '~/types/payloads/message';

export const messageRouter = createTRPCRouter({
  /**TODO: getchat */

  // procedure for manually creating message (only for testing)
  createMessage: publicProcedure
    .input(createMessagePayload)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .insert(messages)
          .values({
            userMatchId: input.userMatchId,
            senderId: input.senderId,
            receiverId: input.receiverId,
            content: input.content,
            isRead: input.isRead,
          })
          .returning();

        return {
          status: 200,
          data: 'Message created successfully',
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),

  sendMessage: publicProcedure
    .input(sendMessagePayload)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session === null) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const userId = ctx.session.user.id;
      try {
        await ctx.db
          .insert(messages)
          .values({
            userMatchId: input.userMatchId,
            senderId: userId,
            receiverId: input.receiverId,
            content: input.content,
          })
          .returning();

        return {
          status: 200,
          data: 'Message sent successfully',
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),

  availableUser: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session?.user.id) {
      return ctx.db.select({ id: users.id, nim: users.nim }).from(users);
    } else {
      return ctx.db.select({ id: users.id, nim: users.nim }).from(users);
    }
  }),

  /** TODO: optimized the query */
  chatHeader: publicProcedure
    .input(
      z.object({
        limit: z.number().min(5).max(40).default(20),
        cursor: z.number().min(1).default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (ctx.session === null) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const userId = ctx.session.user.id;

      const users1 = alias(users, 'users1');
      const users2 = alias(users, 'users2');
      const profiles1 = alias(profiles, 'profiles1');
      const profiles2 = alias(profiles, 'profiles2');

      const chatHeaders = await ctx.db
        .selectDistinctOn([messages.userMatchId], {
          id: messages.id,
          createdAt: messages.createdAt,
          userMatchId: messages.userMatchId,
          senderId: messages.senderId,
          senderName: profiles1.name,
          senderImage: profiles1.profileImage,
          receiverId: messages.receiverId,
          receiverName: profiles2.name,
          receiverImage: profiles2.profileImage,
          isRead: messages.isRead,
          content: messages.content,
          isRevealed: userMatches.isRevealed,
        })
        .from(messages)
        .innerJoin(users1, eq(messages.senderId, users1.id))
        .innerJoin(profiles1, eq(users1.id, profiles1.userId))
        .innerJoin(users2, eq(messages.receiverId, users2.id))
        .innerJoin(profiles2, eq(users2.id, profiles2.userId))
        .innerJoin(userMatches, eq(messages.userMatchId, userMatches.id))
        .where(
          and(
            isNotNull(messages.userMatchId),
            or(eq(messages.senderId, userId), eq(messages.receiverId, userId)),
          ),
        )
        .orderBy(desc(messages.createdAt))
        .limit(input.limit)
        .offset(input.limit * (input.cursor - 1));

      const data: ChatHeader[] = chatHeaders.map((chatHeader) => {
        const otherUser =
          chatHeader.senderId === userId
            ? {
                id: chatHeader.receiverId,
                name: chatHeader.receiverName,
                profileImage: chatHeader.receiverImage,
              }
            : {
                id: chatHeader.senderId,
                name: chatHeader.senderName,
                profileImage: chatHeader.receiverImage,
              };
        if (!otherUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Other user profile not found',
          });
        }

        return {
          user: {
            id: otherUser.id,
            name: !chatHeader.isRevealed ? 'Anonymous' : otherUser.name,
            profileImage: !chatHeader.isRevealed
              ? null
              : otherUser.profileImage,
          },
          lastMessage: {
            id: chatHeader.id,
            senderId: chatHeader.senderId,
            receiverId: chatHeader.receiverId,
            content: chatHeader.content,
            isRead: chatHeader.isRead,
            createdAt: chatHeader.createdAt,
            userMatchId: chatHeader.userMatchId,
          },
          unreadMessageCount: 0,
        };
      });

      const toCheckIds = chatHeaders
        .filter((e) => !e.isRead && e.receiverId == userId)
        .map((e) => e.senderId);

      const unreadCount = await ctx.db
        .select({
          senderId: messages.senderId,
          count: sql<number>`cast(count(*) as int)`.as('count'),
        })
        .from(messages)
        .where(
          and(
            eq(messages.receiverId, userId),
            eq(messages.isRead, false),
            inArray(messages.senderId, toCheckIds),
          ),
        )
        .groupBy(messages.senderId);

      data.forEach((e) => {
        if (!e.lastMessage.isRead && e.lastMessage.receiverId == userId) {
          const unreadTarget = unreadCount.filter(
            (u) => u.senderId === e.lastMessage.senderId,
          )[0];

          if (unreadTarget) {
            e.unreadMessageCount = unreadTarget.count;
          }
        }
      });

      return {
        data,
        nextCursor: data.length < input.limit ? undefined : input.limit + 1,
      };
    }),
});
