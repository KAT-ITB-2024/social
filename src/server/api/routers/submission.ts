import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  assignmentSubmissions,
  assignments,
  users,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { hash } from 'bcrypt';
import {
  putSubmissionPayload,
  submissionPayload,
} from '~/types/payloads/submission';

export const submissionRouter = createTRPCRouter({
  postSubmission: publicProcedure
    .input(submissionPayload)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.nim, input.nim));

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const assignment = await ctx.db
        .select()
        .from(assignments)
        .where(eq(assignments.id, input.assignmentId));

      if (!assignment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Assignment not found',
        });
      }

      await ctx.db
        .insert(assignmentSubmissions)
        .values({
          assignmentId: input.assignmentId,
          userNim: input.nim,
          files: input.files,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({
          id: assignmentSubmissions.id,
        });

      return { message: 'Assignment successfully submitted' };
    }),

  putSubmission: publicProcedure
    .input(putSubmissionPayload)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.nim, input.nim));

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const assignment = await ctx.db
        .select()
        .from(assignments)
        .where(eq(assignments.id, input.submissionId));

      if (!assignment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Assignment not found',
        });
      }

      await ctx.db
        .update(assignmentSubmissions)
        .set({ files: input.files })
        .where(eq(assignmentSubmissions.id, input.submissionId));
    }),
});
