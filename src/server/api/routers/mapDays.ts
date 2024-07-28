import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  events,
  assignmentSubmissions,
  eventAssignments,
  characters,
} from '@katitb2024/database';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { type CompletedDay } from '~/types/payloads/mapDays';

export const mapDaysRouter = createTRPCRouter({
  getOpenedDays: publicProcedure.query(async ({ ctx }) => {
    try {
      const sessionUser = ctx.session?.user;

      if (!sessionUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const userNim: string = sessionUser.nim;

      const completedAssignments = await ctx.db
        .select()
        .from(assignmentSubmissions)
        .where(eq(assignmentSubmissions.userNim, userNim));

      if (completedAssignments.length === 0) {
        return [];
      }

      // Extract the completed assignment IDs
      const completedAssignmentIds = completedAssignments.map(
        (submission) => submission.assignmentId,
      );

      const allEventAssignments = await ctx.db
        .select({
          eventId: eventAssignments.eventId,
          assignmentId: eventAssignments.assignmentId,
        })
        .from(eventAssignments);

      const allEvents = await ctx.db
        .select({
          eventId: events.id,
          day: events.day,
          lore: events.lore,
          characterName: characters.name,
          characterImage: characters.characterImage,
          guidebook: events.guideBook,
          youtubeVideo: events.youtubeVideo,
        })
        .from(events)
        .innerJoin(characters, eq(events.characterName, characters.name));

      const eventAssignmentsMap = new Map<string, Set<string>>();

      allEventAssignments.forEach((curr) => {
        const eventId = curr.eventId;
        if (!eventAssignmentsMap.has(eventId)) {
          eventAssignmentsMap.set(eventId, new Set<string>());
        }
        eventAssignmentsMap.get(eventId)?.add(curr.assignmentId);
      });

      const completedDays: CompletedDay[] = allEvents
        .filter((event) => {
          const requiredAssignments =
            eventAssignmentsMap.get(event.eventId) ?? new Set();
          return Array.from(requiredAssignments).every((id) =>
            completedAssignmentIds.includes(id),
          );
        })
        .map((event) => ({
          id: event.eventId,
          day: event.day,
          lore: event.lore,
          characterName: event.characterName,
          characterImage: event.characterImage,
          guidebook: event.guidebook,
          youtubeVideo: event.youtubeVideo,
        }));

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
