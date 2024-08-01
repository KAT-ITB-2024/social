import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  assignmentSubmissions,
  assignmentTypeEnum,
  assignments,
  profiles,
  users,
} from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import {
  putSubmissionPayload,
  submissionPayload,
} from '~/types/payloads/submission';

export const submissionRouter = createTRPCRouter({
  postSubmission: publicProcedure
    .input(submissionPayload)
    .mutation(async ({ ctx, input }) => {
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
            eq(assignmentSubmissions.userNim, ctx.session?.user.nim ?? ''),
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
        const groupNumber = await ctx.db
          .select({
            group: profiles.groupNumber,
          })
          .from(profiles)
          .where(eq(profiles.userId, ctx.session?.user.id ?? ''))
          .then((result) => result[0]?.group);

        if (!groupNumber) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Group number not found',
          });
        }

        const usersInGroup = await ctx.db
          .select({
            name: profiles.name,
            userid: profiles.userId,
            point: profiles.point,
          })
          .from(profiles)
          .where(eq(profiles.groupNumber, groupNumber));

        if (!usersInGroup) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No users found in the group',
          });
        }

        for (const element of usersInGroup) {
          const userDetail = await ctx.db
            .select()
            .from(users)
            .where(eq(users.id, element.userid))
            .then((result) => result[0]);

          if (!userDetail) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `User with name ${element.name} not found`,
            });
          }

          await ctx.db
            .insert(assignmentSubmissions)
            .values({
              assignmentId: input.assignmentId,
              userNim: userDetail.nim,
              files: input.files,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .returning({
              id: assignmentSubmissions.id,
            });

          await ctx.db
            .update(profiles)
            .set({
              point: element.point ?? 0 + (assignment.assignments.point ?? 0),
            })
            .where(eq(profiles.userId, element.userid));
        }
      }

      return { message: 'Assignment successfully submitted' };
    }),

  putSubmission: publicProcedure
    .input(putSubmissionPayload)
    .mutation(async ({ ctx, input }) => {
      const assignment = await ctx.db
        .select()
        .from(assignments)
        .leftJoin(
          assignmentSubmissions,
          eq(assignments.id, assignmentSubmissions.assignmentId),
        )
        .where(
          and(
            eq(assignmentSubmissions.id, input.submissionId ?? ''),
            eq(assignmentSubmissions.userNim, ctx.session?.user.nim ?? ''),
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
