import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { eventPresences, events, presenceTypeEnum } from '@katitb2024/database';
import { and, eq, lte } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const presenceEventEnum = z.enum(['Opening', 'Closing']);

export const attendanceRouter = createTRPCRouter({
  getAllAttendances: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in!',
      });
    }
    const eventResults = await ctx.db
      .select()
      .from(events)
      .where(and(lte(events.eventDate, new Date())));

    const eventPresencesResults = await ctx.db
      .select()
      .from(eventPresences)
      .where(eq(eventPresences.userNim, ctx.session.user.nim));
    const results = eventResults.map((event) => {
      const presencesForEvent = eventPresencesResults.filter(
        (presence) => presence.eventId === event.id,
      );

      const openingPresence = presencesForEvent.find(
        (presence) => presence.presenceEvent === 'Opening',
      );
      const closingPresence = presencesForEvent.find(
        (presence) => presence.presenceEvent === 'Closing',
      );

      return {
        ...event,
        opening: openingPresence ?? null,
        closing: closingPresence ?? null,
      };
    });
    return results;
  }),

  attend: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
        presenceEvent: presenceEventEnum,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in!',
        });
      }

      try {
        await ctx.db.insert(eventPresences).values({
          eventId: input.eventId,
          presenceType: presenceTypeEnum.enumValues[0],
          userNim: ctx.session.user.nim,
          createdAt: new Date(),
          updatedAt: new Date(),
          presenceEvent: input.presenceEvent,
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong!',
        });
      }
    }),
});
