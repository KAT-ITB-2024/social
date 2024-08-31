import { TRPCError } from '@trpc/server';
import { createTRPCRouter, pesertaProcedure } from '../trpc';
import {
  characters,
  type Event,
  events,
  postTests,
} from '@katitb2024/database';
import { asc, eq, lte } from 'drizzle-orm';
import { getCurrentWIBTime, getPreviousWIBTime } from '../helpers/utils';
import { type OpenedDays } from '@/types/payloads/map';

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
      .select({
        eventId: events.id,
        eventDate: events.eventDate,
        day: events.day,
        lore: events.lore,
        youtubeVideo: events.youtubeVideo,
        googleFormLink: postTests.googleFormLink,
        guidebookLink: events.guideBook,
        characterImage: characters.characterImage,
      })
      .from(events)
      .leftJoin(postTests, eq(events.id, postTests.eventId))
      .leftJoin(characters, eq(events.characterName, characters.name))
      .where(lte(events.eventDate, getPreviousWIBTime()))
      .orderBy(asc(events.eventDate));

    if (!openedEvents) {
      return [];
    }

    const now = getCurrentWIBTime();
    const result: OpenedDays[] = [];

    openedEvents.forEach((event) => {
      if (event.eventDate > now) {
        if (now.getUTCHours() >= 18) {
          result.push(event as OpenedDays);
        }
      } else {
        result.push(event as OpenedDays);
      }
    });

    return result;
  }),
});
