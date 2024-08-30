import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { and, desc, eq, isNotNull, lte, or } from 'drizzle-orm';
import { messages, profiles, userMatches } from '@katitb2024/database';
import { z } from 'zod';
import { alias } from 'drizzle-orm/pg-core';
import {
  createMessagePayload,
  sendMessagePayload,
  updateVisibilityPayload,
  type ChatHeader,
  type ChatHeaderData,
} from '~/types/enums/message';
import ProfilePage from '~/app/profile/page';

export const messageRouter = createTRPCRouter({
  /**
   * Get messages based on cursor, take, and userMatchId
   */
  getChat: publicProcedure
    .input(
      z.object({
        cursor: z.date().optional(),
        take: z.number().min(1).max(50).default(15),
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
        .select({
          firstUserId: userMatches.firstUserId,
          secondUserId: userMatches.secondUserId,
        })
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

        // await ctx.db
        //   .update(userMatches)
        //   .set({
        //     lastMessage: input.content,
        //   })
        //   .where(eq(userMatches.id, input.userMatchId));

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

  chatHeaders: publicProcedure
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
        .select()
        .from(userMatches)
        .where(
          and(
            or(
              eq(userMatches.firstUserId, userId),
              eq(userMatches.secondUserId, userId),
            ),
            isNotNull(userMatches.endedAt),
          ),
        );

      const numberOfHeaders = totalCursor.length;
      const numberOfCursors = Math.max(
        1,
        Math.ceil(numberOfHeaders / input.limit),
      );

      const chatHeaders: ChatHeaderData[] = await ctx.db
        .select({
          firstUser: {
            id: userMatches.firstUserId,
            name: profiles1.name,
            profileImage: profiles1.profileImage,
          },
          secondUser: {
            id: userMatches.secondUserId,
            name: profiles2.name,
            profileImage: profiles2.profileImage,
          },
          lastMessage: userMatches.lastMessage,
          isRevealed: userMatches.isRevealed,
          isAnonymous: userMatches.isAnonymous,
          endedAt: userMatches.endedAt,
          id: userMatches.id,
        })
        .from(userMatches)
        .innerJoin(profiles1, eq(profiles1.userId, userMatches.firstUserId))
        .innerJoin(profiles2, eq(profiles2.userId, userMatches.secondUserId))
        .where(
          and(
            or(
              eq(userMatches.firstUserId, userId),
              eq(userMatches.secondUserId, userId),
            ),
            isNotNull(userMatches.endedAt),
          ),
        )
        .orderBy(desc(userMatches.endedAt))
        .limit(input.limit)
        .offset(input.limit * (input.cursor - 1));

      const data: ChatHeader[] = chatHeaders.map((chatHeader) => {
        const otherUser =
          chatHeader.firstUser.id === userId
            ? chatHeader.secondUser
            : chatHeader.firstUser;
        if (!otherUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Other user profile not found',
          });
        }

        return {
          lastMessage: chatHeader.lastMessage,
          user: {
            id: otherUser.id,
            name:
              chatHeader.isAnonymous && !chatHeader.isRevealed
                ? 'Anynomous'
                : otherUser.name,
            profileImage:
              chatHeader.isAnonymous && !chatHeader.isRevealed
                ? null
                : otherUser.profileImage,
          },
          endedAt: chatHeader.endedAt,
          userMatchId: chatHeader.id,
        };
      });

      return {
        data,
        nextCursor: data.length < input.limit ? undefined : input.cursor + 1,
        numberOfCursors,
        numberOfHeaders,
      };
    }),

  chatHeadersAll: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session === null) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    const userId = ctx.session.user.id;

    // rename profile for table join
    const profiles1 = alias(profiles, 'profiles1');
    const profiles2 = alias(profiles, 'profiles2');

    const chatHeaders: ChatHeaderData[] = await ctx.db
      .select({
        firstUser: {
          id: userMatches.firstUserId,
          name: profiles1.name,
          profileImage: profiles1.profileImage,
        },
        secondUser: {
          id: userMatches.secondUserId,
          name: profiles2.name,
          profileImage: profiles2.profileImage,
        },
        lastMessage: userMatches.lastMessage,
        isRevealed: userMatches.isRevealed,
        isAnonymous: userMatches.isAnonymous,
        endedAt: userMatches.endedAt,
        id: userMatches.id,
      })
      .from(userMatches)
      .innerJoin(profiles1, eq(profiles1.userId, userMatches.firstUserId))
      .innerJoin(profiles2, eq(profiles2.userId, userMatches.secondUserId))
      .where(
        and(
          or(
            eq(userMatches.firstUserId, userId),
            eq(userMatches.secondUserId, userId),
          ),
          isNotNull(userMatches.endedAt),
        ),
      )
      .orderBy(desc(userMatches.endedAt));

    const data: ChatHeader[] = chatHeaders.map((chatHeader) => {
      const otherUser =
        chatHeader.firstUser.id === userId
          ? chatHeader.secondUser
          : chatHeader.firstUser;
      if (!otherUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Other user profile not found',
        });
      }

      return {
        lastMessage: chatHeader.lastMessage,
        user: {
          id: otherUser.id,
          name:
            chatHeader.isAnonymous && !chatHeader.isRevealed
              ? 'Anynomous'
              : otherUser.name,
          profileImage:
            chatHeader.isAnonymous && !chatHeader.isRevealed
              ? null
              : otherUser.profileImage,
        },
        endedAt: chatHeader.endedAt,
        userMatchId: chatHeader.id,
      };
    });

    return data;
  }),

  getSpecificChatHeader: publicProcedure
    .input(updateVisibilityPayload)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be loggedin first!',
        });
      }

      console.log('Ayam');

      const SpecificChat = await ctx.db
        .select({
          endedAt: userMatches.endedAt,
          isAnonymous: userMatches.isAnonymous,
          firstId: userMatches.firstUserId,
          secondId: userMatches.secondUserId,
        })
        .from(userMatches)
        .where(eq(userMatches.id, input.userMatchId))
        .then((res) => res[0]);
      if (!SpecificChat) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Chat history not found',
        });
      }

      const { firstId, secondId } = SpecificChat;

      if (firstId != userId && secondId != userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'This is not your chat',
        });
      }

      if (SpecificChat.endedAt == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You have not end your chat',
        });
      }

      if (SpecificChat.isAnonymous) {
        return {
          name: 'Anonymous',
          profilePic: null,
          endedAt: SpecificChat.endedAt,
        };
      } else {
        const otherUserId = userId == firstId ? secondId : firstId;

        const otherProfile = await ctx.db
          .select({
            name: profiles.name,
            profilePic: profiles.profileImage,
          })
          .from(profiles)
          .where(eq(profiles.userId, otherUserId))
          .then((res) => res[0]);

        return {
          name: otherProfile?.name,
          profilePic: otherProfile?.profilePic,
          endedAt: SpecificChat.endedAt,
        };
      }
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

  updateIsRead: publicProcedure
    .input(
      z.object({
        userMatchId: z.string(),
        receiverId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(messages)
        .set({ isRead: true })
        .where(
          and(
            and(
              eq(messages.userMatchId, input.userMatchId),
              eq(messages.receiverId, input.receiverId),
            ),
            eq(messages.isRead, false),
          ),
        );
    }),

  updateIsReadCurrUser: publicProcedure
    .input(
      z.object({
        userMatchId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session === null) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const userId = ctx.session.user.id;

      await ctx.db
        .update(messages)
        .set({ isRead: true })
        .where(
          and(
            and(
              eq(messages.userMatchId, input.userMatchId),
              eq(messages.receiverId, userId),
            ),
            eq(messages.isRead, false),
          ),
        );
    }),

  updateOneIsRead: publicProcedure
    .input(
      z.object({
        messageId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session === null) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const message = await ctx.db
        .select()
        .from(messages)
        .where(
          and(eq(messages.id, input.messageId), eq(messages.isRead, false)),
        );

      if (!message) {
        throw new TRPCError({
          message: 'Message not found',
          code: 'BAD_REQUEST',
        });
      }

      await ctx.db
        .update(messages)
        .set({
          isRead: true,
        })
        .where(
          and(eq(messages.id, input.messageId), eq(messages.isRead, false)),
        );
    }),
});
