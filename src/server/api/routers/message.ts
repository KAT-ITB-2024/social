import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { and, desc, eq, inArray, lte, or, sql } from 'drizzle-orm';
import { messages, profiles, userMatches } from '@katitb2024/database';
import { z } from 'zod';
import { alias } from 'drizzle-orm/pg-core';
import {
  createMessagePayload,
  sendMessagePayload,
  updateVisibilityPayload,
  type ChatHeader,
  type ChatHeaderData,
} from '~/types/payloads/message';

export const messageRouter = createTRPCRouter({
  /**
   * Get messages based on cursor, take, and userMatchId
   */
  getChat: publicProcedure
    .input(
      z.object({
        cursor: z.date().optional(),
        take: z.number().min(1).max(50).default(25),
        userMatchId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (ctx.session === null) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const userMatchData = await ctx.db
        .select()
        .from(userMatches)
        .where(eq(userMatches.id, input.userMatchId));

      if (!userMatchData[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Match not found!',
        });
      }

      const senderId = ctx.session.user.id;

      if (
        senderId !== userMatchData[0].firstUserId &&
        senderId !== userMatchData[0].secondUserId
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      // query messages from database
      const msgs = await ctx.db
        .select()
        .from(messages)
        .where(
          and(
            eq(messages.userMatchId, input.userMatchId),
            lte(
              messages.createdAt,
              input.cursor ? input.cursor : messages.createdAt,
            ),
          ),
        )
        .orderBy(desc(messages.createdAt))
        .limit(input.take + 1); // get extra record for next cursor

      let nextCursor = undefined;

      // if the length of the messages > input.take, it means there are still more messages left, so we can move the cursor
      if (msgs.length > input.take) {
        const next = msgs.pop();

        if (next) {
          nextCursor = next.createdAt;
        }
      }

      return {
        messages: msgs,
        nextCursor,
      };
    }),

  /**
   * Procedure for manually creating message (only for testing)
   */
  createMessage: publicProcedure
    .input(createMessagePayload)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(messages).values({
          userMatchId: input.userMatchId,
          senderId: input.senderId,
          receiverId: input.receiverId,
          content: input.content,
          isRead: input.isRead,
        });

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

      const userMatchData = await ctx.db
        .select()
        .from(userMatches)
        .where(eq(userMatches.id, input.userMatchId));

      const senderId = ctx.session.user.id;

      // if match not found
      if (!userMatchData[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Match not found!',
        });
      }

      // if sender is not authorized to send message
      if (
        senderId !== userMatchData[0].firstUserId &&
        senderId !== userMatchData[0].secondUserId
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const receiverId =
        userMatchData[0].firstUserId === senderId
          ? userMatchData[0].secondUserId
          : userMatchData[0].firstUserId;

      try {
        await ctx.db.insert(messages).values({
          userMatchId: input.userMatchId,
          senderId,
          receiverId,
          content: input.content,
        });

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

      // rename profile for table join
      const profiles1 = alias(profiles, 'profiles1');
      const profiles2 = alias(profiles, 'profiles2');

      // get total number of headers and pages available
      // delete this query (along with the corresponding response) if you don't need the number of headers and cursors
      const totalCursor = await ctx.db
        .selectDistinct({ userMatchId: messages.userMatchId })
        .from(messages)
        .where(
          or(eq(messages.senderId, userId), eq(messages.receiverId, userId)),
        );

      const numberOfHeaders = totalCursor.length;
      const numberOfCursors = Math.max(
        1,
        Math.ceil(numberOfHeaders / input.limit),
      );

      // subquery for sorted messages
      const sortedMessages = ctx.db
        .select()
        .from(messages)
        .where(
          or(eq(messages.senderId, userId), eq(messages.receiverId, userId)),
        )
        .orderBy(desc(messages.createdAt))
        .as('sortedMessages');

      const latestMessages = await ctx.db
        .selectDistinctOn([sortedMessages.userMatchId], {
          id: sortedMessages.id,
        })
        .from(sortedMessages);

      const latestMessagesIds = latestMessages.map((data) => data.id);

      let chatHeaders: ChatHeaderData[] = [];

      if (latestMessagesIds.length > 0) {
        chatHeaders = await ctx.db
          .select({
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
          .innerJoin(profiles1, eq(messages.senderId, profiles1.userId))
          .innerJoin(profiles2, eq(messages.receiverId, profiles2.userId))
          .innerJoin(userMatches, eq(messages.userMatchId, userMatches.id))
          .where(inArray(messages.id, latestMessagesIds))
          .orderBy(desc(messages.createdAt))
          .limit(input.limit)
          .offset(input.limit * (input.cursor - 1));
      }

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

      // check all ids in chatHeaders where the current user is the receiver and lastMessage's isRead status is false
      const toCheckIds = chatHeaders
        .filter((e) => !e.isRead && e.receiverId === userId)
        .map((e) => e.senderId);

      if (toCheckIds.length > 0) {
        // count unreadCount for all corresponding sender in toCheckIds
        const unreadCount = await ctx.db
          .select({
            senderId: messages.senderId,
            count: sql<number>`cast(count(*) as integer)`.as('count'),
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

        // update the unreadMessageCount for all chatHeaders data
        data.forEach((e) => {
          if (!e.lastMessage.isRead && e.lastMessage.receiverId === userId) {
            const unreadTarget = unreadCount.filter(
              (u) => u.senderId === e.lastMessage.senderId,
            )[0];

            if (unreadTarget) {
              e.unreadMessageCount = unreadTarget.count;
            }
          }
        });
      }

      return {
        data,
        nextCursor: data.length < input.limit ? undefined : input.cursor + 1,
        numberOfCursors, // number of pages available (delete if not needed)
        numberOfHeaders, // number of header records in db (delete if not needed)
      };
    }),

  // update visibility for anonymous chat
  updateVisibility: publicProcedure
    .input(updateVisibilityPayload)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .update(userMatches)
          .set({
            isRevealed: true,
            isAnonymous: false,
          })
          .where(eq(userMatches.id, input.userMatchId));

        return {
          status: 200,
          data: 'Visibility updated successfully',
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),

  // TODO: updateisRead
});
