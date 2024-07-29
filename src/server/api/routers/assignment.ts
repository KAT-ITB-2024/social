import { createTRPCRouter, publicProcedure } from '../trpc';
import { assignmentTypeEnum, assignments } from '@katitb2024/database';
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
        if (!input.id)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Assignment ID was not recieved',
          });

        const quest = await ctx.db
          .select()
          .from(assignments)
          .where(eq(assignments.id, input.id));

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
