import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { assignmentSubmissions, users, profiles } from '@katitb2024/database';
import { TRPCError } from '@trpc/server';

export const submissionRouter = createTRPCRouter({
  getAllSubmissions: publicProcedure.query(async ({ ctx }) => {
    try {
      const submissionList =
        await ctx.db.query.assignmentSubmissions.findMany();

      if (!submissionList) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      return submissionList;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch submissions',
      });
    }
  }),

  getSubmissionByNIM: publicProcedure
    .input(
      z.object({
        userNim: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const submissions = await ctx.db
        .select()
        .from(assignmentSubmissions)
        .where(eq(assignmentSubmissions.userNim, input.userNim));

      if (!submissions.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      return submissions;
    }),

  getSubmissionByNIMandAssignment: publicProcedure
    .input(
      z.object({
        userNim: z.string(),
        assignmentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const submissions = await ctx.db
        .select()
        .from(assignmentSubmissions)
        .where(
          and(
            eq(assignmentSubmissions.userNim, input.userNim),
            eq(assignmentSubmissions.assignmentId, input.assignmentId),
          ),
        );

      if (!submissions.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      return submissions;
    }),

  getAllSubmissionsByGroup: publicProcedure
    .input(
      z.object({
        groupNumber: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userSubmissions = await ctx.db
        .select({
          userNim: users.nim,
          id: assignmentSubmissions.id,
          assignmentId: assignmentSubmissions.assignmentId,
          files: assignmentSubmissions.files,
          createdAt: assignmentSubmissions.createdAt,
          updatedAt: assignmentSubmissions.updatedAt,
        })
        .from(users)
        .leftJoin(profiles, eq(users.id, profiles.userId))
        .leftJoin(
          assignmentSubmissions,
          eq(users.nim, assignmentSubmissions.userNim),
        )
        .where(eq(profiles.groupNumber, input.groupNumber));

      if (!userSubmissions.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      return userSubmissions;
    }),

  getSubmissionByGroupAndAssignment: publicProcedure
    .input(
      z.object({
        groupNumber: z.number(),
        assignmentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userSubmissions = await ctx.db
        .select({
          userNim: users.nim,
          id: assignmentSubmissions.id,
          files: assignmentSubmissions.files,
          createdAt: assignmentSubmissions.createdAt,
          updatedAt: assignmentSubmissions.updatedAt,
        })
        .from(users)
        .leftJoin(profiles, eq(users.id, profiles.userId))
        .leftJoin(
          assignmentSubmissions,
          eq(users.nim, assignmentSubmissions.userNim),
        )
        .where(
          and(
            eq(profiles.groupNumber, input.groupNumber),
            eq(assignmentSubmissions.assignmentId, input.assignmentId),
          ),
        );

      if (!userSubmissions.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      return userSubmissions;
    }),

  getSubmissionAssignment: publicProcedure
    .input(
      z.object({
        assignmentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userSubmissions = await ctx.db
        .select({
          userNim: users.nim,
          id: assignmentSubmissions.id,
          files: assignmentSubmissions.files,
          createdAt: assignmentSubmissions.createdAt,
          updatedAt: assignmentSubmissions.updatedAt,
        })
        .from(users)
        .leftJoin(
          assignmentSubmissions,
          eq(users.nim, assignmentSubmissions.userNim),
        )
        .where(eq(assignmentSubmissions.assignmentId, input.assignmentId));

      if (!userSubmissions.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      }

      return userSubmissions;
    }),
});
