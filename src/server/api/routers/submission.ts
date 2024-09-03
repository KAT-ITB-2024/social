import { createTRPCRouter, pesertaProcedure } from '../trpc';
import {
  type Assignment,
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
  groups,
  profiles,
  users,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { submissionPayload } from '~/types/payloads/submission';

export const submissionRouter = createTRPCRouter({
  postSubmission: pesertaProcedure
    .input(submissionPayload)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      try {
        const result = await ctx.db.transaction(async (transaction) => {
          if (!ctx.session?.user) {
            throw new TRPCError({
              code: 'UNAUTHORIZED',
              message: 'User is not logged in',
            });
          }

          const assignment = await transaction
            .select({
              assignmentId: assignments.id,
              assignmentType: assignments.assignmentType,
              point: assignments.point,
              submissionId: assignmentSubmissions.id,
              startTime: assignments.startTime,
              graded: assignmentSubmissions.point,
            })
            .from(assignments)
            .leftJoin(
              assignmentSubmissions,
              and(
                eq(assignments.id, assignmentSubmissions.assignmentId),
                eq(assignmentSubmissions.userNim, ctx?.session?.user.nim ?? ''),
              ),
            )
            .where(eq(assignments.id, input.assignmentId))
            .then((result) => result[0]);

          if (!assignment) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Assignment not found',
            });
          }

          // Delete existing submission if it exists
          if (assignment.submissionId) {
            await transaction
              .delete(assignmentSubmissions)
              .where(eq(assignmentSubmissions.id, assignment.submissionId));
          }

          if (assignment.graded != null) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Assignment has been graded',
            });
          }
          if (assignment.assignmentType === assignmentTypeEnum.enumValues[0]) {
            // Insert new submission for individual assignments
            await transaction
              .insert(assignmentSubmissions)
              .values({
                assignmentId: input.assignmentId,
                userNim: ctx?.session?.user.nim ?? '',
                filename: input.filename,
                downloadUrl: input.downloadUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
                point: null,
              })
              .returning({
                id: assignmentSubmissions.id,
              });
          } else {
            // Group assignment handling
            const newPoint = calculateNewPoint(assignment);

            const usersInGroup = await transaction
              .select({
                name: profiles.name,
                userid: profiles.userId,
                point: profiles.point,
              })
              .from(profiles)
              .where(eq(profiles.group, ctx.session.user.group));

            const userIds = usersInGroup.map((element) => element.userid);
            const userDetails = await transaction
              .select()
              .from(users)
              .where(inArray(users.id, userIds));

            const userDetailMap = new Map(
              userDetails.map((user) => [user.id, user]),
            );

            const submissions = usersInGroup.map((element) => {
              const userDetail = userDetailMap.get(element.userid);

              if (!userDetail) {
                throw new TRPCError({
                  code: 'NOT_FOUND',
                  message: `User with name ${element.name} not found`,
                });
              }

              return {
                assignmentId: input.assignmentId,
                userNim: userDetail.nim,
                filename: input.filename,
                downloadUrl: input.downloadUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
                point: newPoint,
              };
            });

            await transaction
              .insert(assignmentSubmissions)
              .values(submissions)
              .returning({
                id: assignmentSubmissions.id,
              });

            const group = await transaction
              .select()
              .from(groups)
              .where(eq(groups.name, ctx.session.user.group))
              .then((result) => result[0]);

            if (!group) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Group not found',
              });
            }

            await transaction
              .update(groups)
              .set({
                point: sql`${groups.point} + ${newPoint}`,
              })
              .where(eq(groups.name, ctx.session.user.group));
          }

          return { message: 'Assignment successfully submitted' };
        });

        return result;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while processing your submission',
        });
      }
    }),
});

function calculateNewPoint(assignment: Partial<Assignment>) {
  if (assignment.startTime && assignment.point) {
    const lateHours = Math.min(
      Math.floor(
        (new Date().getTime() - assignment.startTime.getTime()) /
          (1000 * 60 * 60),
      ),
      10,
    );

    return Math.round(assignment.point * (1 - lateHours * 0.01));
  }
  return null;
}
