import { TRPCError } from '@trpc/server';
import { createTRPCRouter, pesertaProcedure } from '../trpc';
import { type Event, events } from '@katitb2024/database';
import { lte, sql } from 'drizzle-orm';
import { getCurrentWIBTime, getPreviousWIBTime } from '../helpers/utils';

export const mapRouter = createTRPCRouter({
  getDays: pesertaProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in',
      });
    }
    const openedEvents = await ctx.db
      .select()
      .from(events)
      .where(lte(events.eventDate, getPreviousWIBTime()));
    if (!openedEvents) {
      return [];
    }

    const now = getCurrentWIBTime();
    const result: Event[] = [];
    openedEvents.forEach((event) => {
      if (event.eventDate > now) {
        if (now.getUTCHours() >= 18) {
          result.push(event);
        }
      } else {
        result.push(event);
      }
    });
    return result;
  }),

  getLastDays: pesertaProcedure.query(async ({ ctx }) => {
    const lastDay = await ctx.db
      .select({
        eventDate: events.eventDate,
      })
      .from(events)
      .orderBy(sql`events.eventDate DESC`)
      .limit(1);
    return lastDay[0];
  }),
});
