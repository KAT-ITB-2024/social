import { createTRPCRouter, publicProcedure } from '../trpc';
import { classes, profiles } from '@katitb2024/database';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { EnrollClassPayload } from '~/types/payloads/warClass';

export const warClassRouter = createTRPCRouter({
  getEnrolledClass: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });
    }

    const userProfile = await ctx.db
      .select({
        chosenClassId: profiles.chosenClass,
      })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1)
      .execute();

    if (
      !userProfile ||
      userProfile.length === 0 ||
      !userProfile[0]?.chosenClassId
    ) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User or enrolled class not found',
      });
    }

    const classId = userProfile[0].chosenClassId;

    const enrolledClass = await ctx.db
      .select({
        id: classes.id,
        title: classes.title,
        topic: classes.topic,
        date: classes.date,
      })
      .from(classes)
      .where(eq(classes.id, classId))
      .limit(1)
      .execute();

    if (!enrolledClass || enrolledClass.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Class not found',
      });
    }

    return enrolledClass[0];
  }),

  getAllClasses: publicProcedure.query(async ({ ctx }) => {
    const allClasses = await ctx.db.select().from(classes).execute();

    return allClasses;
  }),

  enrollClass: publicProcedure
    .input(EnrollClassPayload)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      const { classId } = input;

      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized',
        });
      }

      const userProfile = await ctx.db
        .select({
          chosenClassId: profiles.chosenClass,
        })
        .from(profiles)
        .where(eq(profiles.userId, userId))
        .limit(1)
        .execute();

      if (!userProfile || userProfile.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
      }

      if (userProfile[0]?.chosenClassId) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already enrolled in a class',
        });
      }

      const classToEnroll = await ctx.db
        .select({
          id: classes.id,
          totalSeats: classes.totalSeats,
          reservedSeats: classes.reservedSeats,
        })
        .from(classes)
        .where(eq(classes.id, classId))
        .limit(1)
        .execute();

      if (!classToEnroll || classToEnroll.length === 0) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Class not found' });
      }

      if (
        (classToEnroll[0]?.reservedSeats ?? 0) >=
        (classToEnroll[0]?.totalSeats ?? 0)
      ) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Class is fully booked',
        });
      }

      await ctx.db.transaction(async (trx) => {
        await trx
          .update(classes)
          .set({
            reservedSeats: (classToEnroll[0]?.reservedSeats ?? 0) + 1,
          })
          .where(eq(classes.id, classId))
          .execute();

        await trx
          .update(profiles)
          .set({
            chosenClass: classId,
          })
          .where(eq(profiles.userId, userId))
          .execute();
      });

      return { message: 'User successfully enrolled' };
    }),
});

export default warClassRouter;
