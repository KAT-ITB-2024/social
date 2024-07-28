import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  events,
  users,
  assignmentSubmissions,
  eventAssignments,
  characters,
} from '@katitb2024/database';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { type User, type CompletedDay } from '~/types/payloads/mapDays';

export const mapDaysRouter = createTRPCRouter({
  getOpenedDays: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { userId } = input;

        // Ini yg pake session tapi kalau mau testing dari api panel blm bs, jadinya pake yg query db dlu
        // const sessionUser = ctx.session?.user;

        // if (!sessionUser || sessionUser.id !== userId) {
        //   throw new TRPCError({
        //     code: 'NOT_FOUND',
        //     message: 'User not found',
        //   });
        // }

        // const userNim: string = sessionUser.nim;

        //Ini query db
        const user: User | null = await ctx.db
          .select()
          .from(users)
          .where(eq(users.id, userId))
          .then((result) => result[0] ?? null);

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        const completedAssignments = await ctx.db
          .select()
          .from(assignmentSubmissions)
          .where(eq(assignmentSubmissions.userNim, user.nim)); // ini kalo session harus ubah jdi userNim

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

        const eventAssignmentsMap = allEventAssignments.reduce(
          (acc, curr) => {
            const eventId = curr.eventId;
            if (!acc[eventId]) {
              acc[eventId] = new Set<string>();
            }

            acc[eventId].add(curr.assignmentId);
            return acc;
          },
          {} as Record<string, Set<string>>,
        );

        const completedDays: CompletedDay[] = allEvents
          .filter((event) => {
            const requiredAssignments =
              eventAssignmentsMap[event.eventId] ?? new Set();
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
