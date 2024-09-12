import { TRPCError } from '@trpc/server';
import { createTRPCRouter, pesertaProcedure } from '../trpc';
import { characters, events, postTests } from '@katitb2024/database';
import { asc, eq } from 'drizzle-orm';
import { type OpenedDays } from '@/types/payloads/map';
import { cacheOpenedDays, getOpenedDays } from '~/server/redis/day';

export const mapRouter = createTRPCRouter({
  getDays: pesertaProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in',
      });
    }
    const openedEvents = await getOpenedDays();

    if (!openedEvents) {
      const openedDaysFromDb = await ctx.db
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
        .orderBy(asc(events.eventDate));
      if (openedDaysFromDb) {
        await cacheOpenedDays(openedDaysFromDb as OpenedDays[]);
        return openedDaysFromDb as OpenedDays[];
      } else {
        return [];
      }
    }
    return openedEvents;
  }),
});
