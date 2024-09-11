import { createTRPCRouter, pesertaProcedure } from '../trpc';
import {
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { eq, and, lte } from 'drizzle-orm';
import { getAssignmentByIdPayload } from '~/types/payloads/assignment';

export const assignmentRouter = createTRPCRouter({
  getDailyQuest: pesertaProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User is not logged in',
      });
    }

    try {
      const dailyQuests = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          and(
            eq(assignments.id, assignmentSubmissions.assignmentId),
            eq(assignmentSubmissions.userNim, ctx.session.user.nim),
          ),
        )
        .where(
          and(
            eq(assignments.assignmentType, assignmentTypeEnum.enumValues[0]), // Daily Quest
            lte(assignments.startTime, new Date()),
          ),
        );

      return dailyQuests || [];
    } catch (e) {
      console.error('Error fetching daily quests:', e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch daily quests',
      });
    }
  }),

  getSideQuest: pesertaProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User is not logged in',
      });
    }

    try {
      const sideQuests = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          and(
            eq(assignments.id, assignmentSubmissions.assignmentId),
            eq(assignmentSubmissions.userNim, ctx.session.user.nim),
          ),
        )
        .where(
          and(
            eq(assignments.assignmentType, assignmentTypeEnum.enumValues[1]), // Side Quest
            lte(assignments.startTime, new Date()),
          ),
        );

      return sideQuests || [];
    } catch (e) {
      console.error('Error fetching side quests:', e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch side quests',
      });
    }
  }),

  getQuestById: pesertaProcedure
    .input(getAssignmentByIdPayload)
    .query(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      if (!input.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Assignment ID was not provided',
        });
      }

      try {
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

        if (!assignment) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Assignment not found',
          });
        }

        return assignment;
      } catch (e) {
        console.error('Error fetching assignment by ID:', e);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch assignment',
        });
      }
    }),
});
