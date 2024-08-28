import { createTRPCRouter, publicProcedure } from '../trpc';
import { classes, groups, profiles } from '@katitb2024/database';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { EnrollClassPayload } from '~/types/payloads/class';
import { z } from 'zod';

export const classRouter = createTRPCRouter({
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
      return null;
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
    const user = ctx.session?.user;
    if (!ctx.session || !user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in yet!',
      });
    }
    const group = await ctx.db
      .select({
        bata: groups.bata,
      })
      .from(groups)
      .where(eq(groups.name, ctx.session.user.group));
    if (!group[0]) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Bata not found!',
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const userSession = parseInt(group[0].bata);
    let sessionCondition;

    if (userSession <= 4) {
      sessionCondition = eq(classes.type, 'Sesi 1');
    } else {
      sessionCondition = eq(classes.type, 'Sesi 2');
    }
    const allClasses = await ctx.db
      .select()
      .from(classes)
      .where(sessionCondition)
      .execute();
    return allClasses;
  }),

  getClassById: publicProcedure
    .input(z.string().nonempty('Class ID cannot be empty'))
    .query(async ({ input, ctx }) => {
      const classId = input;

      const selectedClass = await ctx.db
        .select({
          id: classes.id,
          title: classes.title,
          topic: classes.topic,
          date: classes.date,
          location: classes.location,
          speaker: classes.speaker,
          description: classes.description,
          totalSeats: classes.totalSeats,
          reservedSeats: classes.reservedSeats,
        })
        .from(classes)
        .where(eq(classes.id, classId))
        .limit(1)
        .execute();

      if (!selectedClass || selectedClass.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Class not found',
        });
      }

      const classData = selectedClass[0];

      const formattedDate = classData?.date
        ? new Date(classData.date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          })
        : 'Unknown Date';

      const formattedTime = classData?.date
        ? new Date(classData.date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        : 'Unknown Time';

      return {
        ...classData,
        formattedDate,
        formattedTime,
      };
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

export default classRouter;
