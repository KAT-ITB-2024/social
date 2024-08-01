import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { getAssignmentByIdPayload } from '~/types/payloads/assignment';

export const assignmentRouter = createTRPCRouter({
  getDailyQuest: publicProcedure.query(async ({ ctx }) => {
    try {
      const dailyQuests = await ctx.db
        .select()
        .from(assignments)
        .where(
          eq(assignments.assignmentType, assignmentTypeEnum.enumValues[0]),
        );

      if (!dailyQuests) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No daily quest found',
        });
      }

      const res = [];
      for (const quest of dailyQuests) {
        const submissions = await ctx.db
          .select()
          .from(assignmentSubmissions)
          .where(eq(assignmentSubmissions.assignmentId, quest.id));

        res.push({
          quest,
          submissions,
        });
      }

      return res;
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      });
    }
  }),

  getSideQuest: publicProcedure.query(async ({ ctx }) => {
    try {
      const sideQuests = await ctx.db
        .select()
        .from(assignments)
        .where(
          eq(assignments.assignmentType, assignmentTypeEnum.enumValues[1]),
        );

      if (!sideQuests) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No side quest found',
        });
      }

      const res = [];
      for (const quest of sideQuests) {
        const submissions = await ctx.db
          .select()
          .from(assignmentSubmissions)
          .where(eq(assignmentSubmissions.assignmentId, quest.id));

        res.push({
          quest,
          submissions,
        });
      }

      return res;
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
        if (!input.id)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Assignment ID was not recieved',
          });

        const quest = await ctx.db
          .select()
          .from(assignments)
          .where(eq(assignments.id, input.id))
          .then((result) => result[0]);

        if (!quest)
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Quest not found',
          });

        const submissions = await ctx.db
          .select()
          .from(assignmentSubmissions)
          .where(eq(assignmentSubmissions.assignmentId, quest.id));

        return {
          quest,
          submissions,
        };
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        });
      }
    }),
});
