import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  events,
  characters,
  postTestSubmissions,
  postTests,
} from '@katitb2024/database';
import { eq, exists, and } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { type CompletedDay } from '~/types/payloads/mapDays';

export const mapDaysRouter = createTRPCRouter({
  getOpenedDays: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in',
        });
      }

      const sessionUser = ctx.session?.user;

      if (!sessionUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const userNim: string = sessionUser.nim;

      // Get all completed assignments
      const completedEvents = await ctx.db
        .select()
        .from(events)
        .where(
          exists(
            ctx.db
              .select()
              .from(postTests)
              .innerJoin(
                postTestSubmissions,
                eq(postTests.id, postTestSubmissions.postTestId),
              )
              .where(
                and(
                  eq(postTests.eventId, events.id),
                  eq(postTestSubmissions.userNim, userNim),
                ),
              ),
          ),
        )
        .innerJoin(characters, eq(events.characterName, characters.name));

      if (completedEvents.length === 0) {
        return [];
      }

      const completedDays: CompletedDay[] = completedEvents.map((event) => {
        const currevent = event.events;
        const currchar = event.characters;
        return {
          id: currevent.id,
          characterImage: currchar.characterImage,
          characterName: currchar.name,
          day: currevent.day,
          guidebook: currevent.guideBook,
          lore: currevent.lore,
          youtubeVideo: currevent.youtubeVideo,
        };
      });

      return completedDays;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
        cause: error,
      });
    }
  }),
});
