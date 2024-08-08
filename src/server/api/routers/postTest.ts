import { createTRPCRouter, publicProcedure } from '../trpc';
import { postTestSubmissions, postTests } from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { postTestIdPayload } from '~/types/payloads/postTest';
import { and, eq, isNull, not } from 'drizzle-orm';

export const postTestRouter = createTRPCRouter({
  insertPostTestSubmission: publicProcedure
    .input(postTestIdPayload)
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.session || !ctx.session.user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User not logged in',
          });
        }

        const userNim: string = ctx.session.user.nim;
        const { postTestId } = input;

        await ctx.db.insert(postTestSubmissions).values({
          postTestId,
          userNim,
          createdAt: new Date(),
        });

        return {
          status: 200,
          success: true,
          message: 'Post-test submission inserted successfully',
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error occurred while inserting the post-test submission',
          cause: error,
        });
      }
    }),

  getAllPostTests: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in',
        });
      }

      const allPostTests = await ctx.db.select().from(postTests);

      return allPostTests;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error occurred while fetching all post-tests',
        cause: error,
      });
    }
  }),

  getUnsubmittedPostTests: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in',
      });
    }

    const userNim: string = ctx.session.user.nim;

    try {
      const unsubmittedPostTests = await ctx.db
        .select({
          id: postTests.id,
          title: postTests.title,
          description: postTests.description,
          startTime: postTests.startTime,
          deadline: postTests.deadline,
          eventId: postTests.eventId,
          googleFormLink: postTests.googleFormLink,
        })
        .from(postTests)
        .leftJoin(
          postTestSubmissions,
          and(
            eq(postTestSubmissions.postTestId, postTests.id),
            eq(postTestSubmissions.userNim, userNim),
          ),
        )
        .where(isNull(postTestSubmissions.userNim));

      return unsubmittedPostTests;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error occurred while fetching unsubmitted post-tests',
        cause: error,
      });
    }
  }),

  getSubmittedPostTests: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in',
      });
    }

    const userNim: string = ctx.session.user.nim;

    try {
      const submittedPostTests = await ctx.db
        .select({
          id: postTests.id,
          title: postTests.title,
          description: postTests.description,
          startTime: postTests.startTime,
          deadline: postTests.deadline,
          eventId: postTests.eventId,
          googleFormLink: postTests.googleFormLink,
        })
        .from(postTests)
        .leftJoin(
          postTestSubmissions,
          and(
            eq(postTestSubmissions.postTestId, postTests.id),
            eq(postTestSubmissions.userNim, userNim),
          ),
        )
        .where(not(isNull(postTestSubmissions.userNim)));

      return submittedPostTests;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error occurred while fetching submitted post-tests',
        cause: error,
      });
    }
  }),
});
