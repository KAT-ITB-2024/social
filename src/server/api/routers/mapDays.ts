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
          .where(eq(assignmentSubmissions.userNim, user.nim));

        if (completedAssignments.length === 0) {
          return [];
        }

        // Extract the completed assignment IDs
        const completedAssignmentIds = completedAssignments.map(
          (submission) => submission.assignmentId,
        );

        const allEvents = await ctx.db.select().from(events);

        // Fetch all event assignments
        const allEventAssignments = await ctx.db
          .select()
          .from(eventAssignments);

        if (allEvents.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No events found',
          });
        }

        if (allEventAssignments.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No event assignments found',
          });
        }

        const allCharacters = await ctx.db.select().from(characters);

        // Determine which days are completed
        const completedDays: CompletedDay[] = allEvents
          .filter((event) => {
            // Find assignments for this event/day
            const eventAssignmentIds = allEventAssignments
              .filter((ea) => ea.eventId === event.id)
              .map((ea) => ea.assignmentId);

            // Check if all assignments for this day are completed
            const allAssignmentsCompleted = eventAssignmentIds.every((id) =>
              completedAssignmentIds.includes(id),
            );

            return allAssignmentsCompleted;
          })
          .map((event) => {
            const character = allCharacters.find(
              (char) => char.name === event.characterName,
            );

            return {
              id: event.id,
              day: event.day,
              lore: event.lore,
              characterImage: character?.characterImage ?? '',
              guidebook: event.guideBook,
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
