import { createTRPCRouter, pesertaProcedure } from '~/server/api/trpc';
import {
  eventPresences,
  events,
  presenceTypeEnum,
  presenceEventEnum,
} from '@katitb2024/database';
import { and, eq, lte } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getCurrentWIBTime, isAllowedToPresence } from '../helpers/utils';

export const attendanceRouter = createTRPCRouter({
  getAllAttendances: pesertaProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in!',
      });
    }

    const { nim } = ctx.session.user;

    try {
      const [eventResults, eventPresencesResults] = await Promise.all([
        ctx.db
          .select()
          .from(events)
          .where(lte(events.eventDate, getCurrentWIBTime())),
        ctx.db
          .select()
          .from(eventPresences)
          .where(eq(eventPresences.userNim, nim)),
      ]);

      return eventResults.map((event) => {
        const presencesForEvent = eventPresencesResults.filter(
          (presence) => presence.eventId === event.id,
        );

        return {
          ...event,
          opening:
            presencesForEvent.find(
              (presence) =>
                presence.presenceEvent === presenceEventEnum.enumValues[0],
            ) ?? null,
          closing:
            presencesForEvent.find(
              (presence) =>
                presence.presenceEvent === presenceEventEnum.enumValues[1],
            ) ?? null,
        };
      });
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch attendances!',
      });
    }
  }),

  attend: pesertaProcedure
    .input(
      z.object({
        eventId: z.string(),
        presenceEvent: z.enum(presenceEventEnum.enumValues),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in!',
        });
      }

      const { presenceEvent, eventId } = input;
      const { nim } = ctx.session.user;
      const now = getCurrentWIBTime();

      try {
        const event = await ctx.db
          .select()
          .from(events)
          .where(eq(events.id, eventId))
          .then((result) => result[0]);

        if (!event) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Event not found!',
          });
        }

        const startTime =
          presenceEvent === presenceEventEnum.enumValues[0]
            ? event.openingOpenPresenceTime
            : event.closingOpenPresenceTime;
        const endTime =
          presenceEvent === presenceEventEnum.enumValues[0]
            ? event.openingClosePresenceTime
            : event.closingClosePresenceTime;

        if (!isAllowedToPresence(startTime, endTime, event.eventDate)) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Presence is not allowed at this time!',
          });
        }

        // Check if user has already registered presence for this event
        const existingPresence = await ctx.db
          .select()
          .from(eventPresences)
          .where(
            and(
              eq(eventPresences.eventId, eventId),
              eq(eventPresences.userNim, nim),
              eq(eventPresences.presenceEvent, presenceEvent),
            ),
          )
          .then((result) => result[0]);

        if (existingPresence) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'You have already registered this presence!',
          });
        }

        // Register attendance
        await ctx.db.insert(eventPresences).values({
          eventId,
          presenceType: presenceTypeEnum.enumValues[0],
          userNim: nim,
          createdAt: now,
          updatedAt: now,
          presenceEvent,
        });
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to register attendance!',
        });
      }
    }),
});
