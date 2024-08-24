import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { eq, and, lte } from 'drizzle-orm';
import { getAssignmentByIdPayload } from '~/types/payloads/assignment';

export const assignmentRouter = createTRPCRouter({
  getDailyQuest: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      const userSubmissionQuery = ctx.db
        .select()
        .from(assignmentSubmissions)
        .where(eq(assignmentSubmissions.userNim, ctx.session.user.nim))
        .as('assignmentSubmissions');

      const dailyQuests = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          userSubmissionQuery,
          eq(assignments.id, userSubmissionQuery.assignmentId),
        )
        .where(
          and(
            eq(assignments.assignmentType, assignmentTypeEnum.enumValues[0]),
            lte(assignments.startTime, new Date()),
          ),
        );

      if (!dailyQuests) {
        return [];
      }

      return dailyQuests;
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      });
    }
  }),

  getSideQuest: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      const userSubmissionQuery = ctx.db
        .select()
        .from(assignmentSubmissions)
        .where(eq(assignmentSubmissions.userNim, ctx.session.user.nim))
        .as('assignmentSubmissions');

      const sideQuests = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          userSubmissionQuery,
          eq(assignments.id, userSubmissionQuery.assignmentId),
        )
        .where(
          and(
            eq(assignments.assignmentType, assignmentTypeEnum.enumValues[1]),
            lte(assignments.startTime, new Date()),
          ),
        );

      if (!sideQuests) {
        return [];
      }

      return sideQuests;
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      });
    }
  }),

  getQuestById: publicProcedure
    .input(getAssignmentByIdPayload)
    .query(async ({ ctx, input }) => {
      try {
        if (!ctx.session || !ctx.session.user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User is not logged in',
          });
        }

        if (!input.id)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Assignment ID was not received',
          });

        const assignment = await ctx.db
          .select()
          .from(assignments)
          .leftJoin(
            assignmentSubmissions,
            and(
              eq(assignments.id, assignmentSubmissions.assignmentId),
              eq(assignmentSubmissions.userNim, ctx.session.user.nim),
            ),
          )
          .where(eq(assignments.id, input.id))
          .then((result) => result[0]);
        return assignment;
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        });
      }
    }),
});
