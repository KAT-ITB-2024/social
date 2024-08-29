import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { eq, and } from 'drizzle-orm';
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

      const dailyQuests = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          eq(assignments.id, assignmentSubmissions.assignmentId),
        )
        .where(
          and(
            eq(assignments.assignmentType, assignmentTypeEnum.enumValues[0]),
            eq(assignmentSubmissions.userNim, ctx.session?.user.nim),
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

      const sideQuests = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          eq(assignments.id, assignmentSubmissions.assignmentId),
        )
        .where(
          and(
            eq(assignments.assignmentType, assignmentTypeEnum.enumValues[0]),
            eq(assignmentSubmissions.userNim, ctx.session?.user.nim),
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

        const quest = await ctx.db
          .select()
          .from(assignments)
          .leftJoin(
            assignmentSubmissions,
            eq(assignments.id, assignmentSubmissions.assignmentId),
          )
          .where(
            and(
              eq(assignments.id, input.id),
              eq(assignmentSubmissions.userNim, ctx.session.user.nim),
            ),
          )
          .then((result) => result[0]);

        if (!quest)
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Quest not found',
          });

        return quest;
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        });
      }
    }),
});
