import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  Assignment,
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
  profiles,
  users,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { and, eq, sql } from 'drizzle-orm';
import {
  putSubmissionPayload,
  submissionPayload,
} from '~/types/payloads/submission';

export const submissionRouter = createTRPCRouter({
  postSubmission: publicProcedure
    .input(submissionPayload)
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session?.user;
      if (!sessionUser) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      try {
        const assignment = await ctx.db
          .select({
            assignmentId: assignments.id,
            assignmentType: assignments.assignmentType,
            point: assignments.point,
            submissionId: assignmentSubmissions.id,
            startTime: assignments.startTime,
          })
          .from(assignments)
          .leftJoin(
            assignmentSubmissions,
            and(
              eq(assignments.id, assignmentSubmissions.assignmentId),
              eq(assignmentSubmissions.userNim, sessionUser.nim),
            ),
          )
          .where(eq(assignments.id, input.assignmentId))
          .then((result) => result[0]);

        if (!assignment) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Assignment not found',
          });
        } else if (assignment.submissionId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Submission already received, try updating',
          });
        }

        if (assignment.assignmentType === assignmentTypeEnum.enumValues[0]) {
          await ctx.db
            .insert(assignmentSubmissions)
            .values({
              assignmentId: input.assignmentId,
              userNim: sessionUser.nim,
              downloadUrl: input.downloadUrl,
              filename: input.filename,
              createdAt: new Date(),
              updatedAt: new Date(),
              point: null,
            })
            .returning({
              id: assignmentSubmissions.id,
            });
        } else {
          const newPoint = calculateNewPoint(assignment);

          const usersInGroup = await ctx.db
            .select({
              userid: profiles.userId,
              point: profiles.point,
            })
            .from(profiles)
            .where(eq(profiles.group, sessionUser.group));

          if (usersInGroup.length === 0) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'No users found in the group',
            });
          }

          const userIds = usersInGroup.map((element) => element.userid);

          const submissions = userIds.map((userid) => ({
            assignmentId: input.assignmentId,
            userNim: userid,
            downloadUrl: input.downloadUrl,
            filename: input.filename,
            point: newPoint,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));

          await ctx.db
            .insert(assignmentSubmissions)
            .values(submissions)
            .returning({
              id: assignmentSubmissions.id,
            });

          await ctx.db
            .update(profiles)
            .set({
              point: sql`${profiles.point} + ${newPoint}`,
            })
            .where(eq(profiles.group, sessionUser.group));
        }
      } catch (e) {
        console.log(e);
        if (e instanceof TRPCError) {
          throw e;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to submit assignment',
        });
      }

      return { message: 'Assignment successfully submitted' };
    }),

  putSubmission: publicProcedure
    .input(putSubmissionPayload)
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session?.user;
      if (!sessionUser) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      const submission = await ctx.db
        .select({
          assignmentType: assignments.assignmentType,
          submissionPoint: assignmentSubmissions.point,
        })
        .from(assignmentSubmissions)
        .innerJoin(
          assignments,
          eq(assignments.id, assignmentSubmissions.assignmentId),
        )
        .where(
          and(
            eq(assignmentSubmissions.id, input.submissionId),
            eq(assignmentSubmissions.userNim, sessionUser.nim),
          ),
        )
        .then((result) => result[0]);

      if (!submission) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Submission not found',
        });
      } else if (
        submission.assignmentType === assignmentTypeEnum.enumValues[1]
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Cannot update sidequest',
        });
      } else if (submission.submissionPoint !== null) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Submission already scored, cannot be updated',
        });
      }

      await ctx.db
        .update(assignmentSubmissions)
        .set({
          filename: input.filename,
          downloadUrl: input.downloadUrl,
          updatedAt: new Date(),
        })
        .where(eq(assignmentSubmissions.id, input.submissionId));

      return 'Submission successfully updated';
    }),
});

function calculateNewPoint(assignment: Partial<Assignment>) {
  if (assignment.startTime != null && assignment.point != null) {
    const lateHours = Math.min(
      Math.floor(
        (new Date().getTime() - assignment.startTime.getTime()) /
          (1000 * 60 * 60),
      ),
      10,
    );

    return Math.round(assignment.point * (1 - lateHours * 0.05));
  }
  return null;
}
