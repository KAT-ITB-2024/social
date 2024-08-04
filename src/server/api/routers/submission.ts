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
import {
  putSubmissionPayload,
  submissionPayload,
} from '~/types/payloads/submission';

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
        .select()
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          eq(assignments.id, assignmentSubmissions.assignmentId),
        )
        .where(
          and(
            eq(assignments.id, input.assignmentId),
            eq(assignmentSubmissions.userNim, ctx.session?.user.nim),
          ),
        )
        .then((result) => result[0]);

      if (!assignment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Assignment not found',
        });
      } else if (assignment?.assignmentSubmissions) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Submission already received, try updating',
        });
      }

      if (
        assignment?.assignments.assignmentType ==
        assignmentTypeEnum.enumValues[0]
      ) {
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
            files: input.files,
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
          .where(eq(profiles.groupNumber, ctx.session.user.groupNumber));

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
            files: input.files,
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
            point: sql`${profiles.point} + ${assignment.assignments.point}`,
          })
          .where(eq(profiles.groupNumber, ctx.session.user.groupNumber));
      }

      return { message: 'Assignment successfully submitted' };
    }),

  putSubmission: publicProcedure
    .input(putSubmissionPayload)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      const assignment = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          eq(assignments.id, assignmentSubmissions.assignmentId),
        )
        .where(
          and(
            eq(assignmentSubmissions.id, input.submissionId),
            eq(assignmentSubmissions.userNim, ctx.session?.user.nim),
          ),
        )
        .then((result) => result[0]);

      if (!assignment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Assignment not found',
        });
      } else if (
        assignment?.assignments.assignmentType ==
        assignmentTypeEnum.enumValues[1]
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Cannot update sidequest',
        });
      } else if (assignment?.assignmentSubmissions?.point !== null) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Submission already scored, cannot be updated',
        });
      }

      await ctx.db
        .update(assignmentSubmissions)
        .set({
          files: input.files,
          updatedAt: new Date(),
        })
        .where(eq(assignmentSubmissions.id, input.submissionId));

      return 'Submission successfully updated';
    }),
});
