import { createTRPCRouter, publicProcedure } from '../trpc';
import { groups, profiles, users } from '@katitb2024/database';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
export const leaderboardRouter = createTRPCRouter({
  getLeaderboard: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
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
      const { page } = input;
      const itemsPerPage = 20;
      const offset = (page - 1) * itemsPerPage;

      const results = await ctx.db
        .select({
          name: profiles.name,
          nim: users.nim,
          profileImage: profiles.profileImage,
          point: profiles.point,
          rank: sql<number>`RANK() OVER (ORDER BY profiles.point DESC)`,
          totalProfiles: sql<number>`count(*) OVER ()`,
        })
        .from(profiles)
        .innerJoin(users, eq(profiles.userId, users.id))
        .orderBy(sql`profiles.point DESC`)
        .limit(itemsPerPage)
        .offset(offset);

      const totalProfiles =
        results.length > 0 ? (results[0]?.totalProfiles ?? 0) : 0;
      const leaderboard = results.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ totalProfiles, ...rest }) => rest,
      );

      return {
        leaderboard,
        totalProfiles,
      };
    }),

  getMyLeaderboard: publicProcedure.query(async ({ ctx }) => {
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

    const userId: string = sessionUser.id;

    // Fetch the current user's profile and calculate rank using a CTE
    const currentUserProfile = await ctx.db
      .select({
        name: sql`cte.name`,
        nim: sql`cte.nim`,
        profileImage: sql`cte."profileImage"`,
        point: sql`cte.point`,
        rank: sql`cte.rank`,
      })
      .from(
        sql`
      (
        SELECT 
          p."name",
          u."nim",
          p."profileImage",
          p."point",
          RANK() OVER (ORDER BY p."point" DESC) AS rank,
          p."userId" as "userId"
        FROM ${profiles} p
        INNER JOIN ${users} u ON p."userId" = u."id"
      ) AS cte
    `,
      )
      .where(eq(sql`cte."userId"`, userId))
      .then((result) => result[0] ?? null);

    if (!currentUserProfile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Current user profile not found',
      });
    }

    return {
      currentUserProfile,
    };
  }),

  getGroupLeaderboard: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
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

      const { page } = input;
      const itemsPerPage = 20;
      const offset = (page - 1) * itemsPerPage;

      const groupResults = await ctx.db
        .select({
          name: groups.name,
          point: groups.point,
          rank: sql<number>`RANK() OVER (ORDER BY groups.point DESC)`,
          totalGroups: sql<number>`count(*) OVER ()`,
        })
        .from(groups)
        .orderBy(sql`groups.point DESC`)
        .limit(itemsPerPage)
        .offset(offset);

      const totalGroups =
        groupResults.length > 0 ? (groupResults[0]?.totalGroups ?? 0) : 0;
      const groupLeaderboard = groupResults.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ totalGroups, ...rest }) => rest,
      );

      return {
        groupLeaderboard,
        totalGroups,
      };
    }),
});
