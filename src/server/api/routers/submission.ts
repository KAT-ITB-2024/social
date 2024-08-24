import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
  profiles,
  users,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { submissionPayload } from '~/types/payloads/submission';

export const submissionRouter = createTRPCRouter({
  postSubmission: publicProcedure
    .input(submissionPayload)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }
      const assignment = await ctx.db
        .select({
          assignmentId: assignments.id,
          assignmentType: assignments.assignmentType,
          point: assignments.point,
          submissionId: assignmentSubmissions.id,
        })
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          and(
            eq(assignments.id, assignmentSubmissions.assignmentId),
            eq(assignmentSubmissions.userNim, ctx.session.user.nim),
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

      if (assignment.submissionId) {
        // Delete the existing submission before inserting a new one
        await ctx.db
          .delete(assignmentSubmissions)
          .where(eq(assignmentSubmissions.id, assignment.submissionId));
      }

      if (assignment.assignmentType == assignmentTypeEnum.enumValues[0]) {
        const user = await ctx.db
          .select()
          .from(users)
          .where(eq(users.nim, ctx.session?.user.nim ?? ''))
          .then((result) => result[0]);

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        await ctx.db
          .insert(assignmentSubmissions)
          .values({
            assignmentId: input.assignmentId,
            userNim: user.nim,
            filename: input.filename,
            downloadUrl: input.downloadUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning({
            id: assignmentSubmissions.id,
          });
      } else {
        const usersInGroup = await ctx.db
          .select({
            name: profiles.name,
            userid: profiles.userId,
            point: profiles.point,
          })
          .from(profiles)
          .where(eq(profiles.group, ctx.session.user.group));

        if (!usersInGroup) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No users found in the group',
          });
        }

        const userIds = usersInGroup.map((element) => element.userid);
        const userDetails = await ctx.db
          .select()
          .from(users)
          .where(inArray(users.id, userIds));

        const userDetailMap = new Map(
          userDetails.map((user) => [user.id, user]),
        );

        const submissions = [];

        for (const element of usersInGroup) {
          const userDetail = userDetailMap.get(element.userid);

          if (!userDetail) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `User with name ${element.name} not found`,
            });
          }

          submissions.push({
            assignmentId: input.assignmentId,
            userNim: userDetail.nim,
            filename: input.filename,
            downloadUrl: input.downloadUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        await ctx.db
          .insert(assignmentSubmissions)
          .values(submissions)
          .returning({
            id: assignmentSubmissions.id,
          });

        await ctx.db
          .update(profiles)
          .set({
            point: sql`${profiles.point} + ${assignment.point}`,
          })
          .where(eq(profiles.group, ctx.session.user.group));
      }

      return { message: 'Assignment successfully submitted' };
    }),
});
