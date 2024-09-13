import { createTRPCRouter, lembagaProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { eq, and, sql, ilike, or, inArray, is } from 'drizzle-orm';
import {
  grantCoinsPayload,
  getAllVisitorsPayload,
  updateLembagaProfilePayload,
} from '~/types/payloads/lembaga';
import {
  lembagaProfiles,
  users,
  profiles,
  visitors,
} from '@katitb2024/database';
import { createToken } from '../helpers/utils';

export const lembagaRouter = createTRPCRouter({
  grantCoins: lembagaProcedure
    .input(grantCoinsPayload)
    .mutation(async ({ ctx, input }) => {
      const boothId = ctx.session.user.group;
      const data = await ctx.db
        .select()
        .from(visitors)
        .where(
          and(
            eq(visitors.userId, input.userId),
            eq(visitors.boothId, boothId),
            eq(visitors.isGranted, false),
          ),
        );
      if (!data.length) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Cannot grant coins to non-visitor user',
        });
      }

      try {
        const updatedProfileQuery = ctx.db
          .update(profiles)
          .set({
            coins: sql`${profiles.coins} + ${input.coins}`,
          })
          .where(eq(profiles.userId, input.userId))
          .returning();

        const updateIsGrandtedQuery = ctx.db
          .update(visitors)
          .set({
            isGranted: true,
          })
          .where(
            and(
              eq(visitors.userId, input.userId),
              eq(visitors.boothId, boothId),
            ),
          )
          .returning();

        const [updatedProfile] = await Promise.all([
          updatedProfileQuery,
          updateIsGrandtedQuery,
        ]);

        if (updatedProfile.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        return {
          status: 200,
          data: updatedProfile[0],
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to grant coins',
        });
      }
    }),

  getAllVisitors: lembagaProcedure
    .input(getAllVisitorsPayload)
    .query(async ({ ctx, input }) => {
      console.log(input);
      const nameOrNim = input.nameOrNim ? `%${input.nameOrNim}%` : '%';
      const boothId = ctx.session.user.group;

      console.log('Name', nameOrNim);

      const baseQuery = ctx.db
        .select({
          userId: visitors.userId,
          nim: users.nim,
          name: profiles.name,
          faculty: profiles.faculty,
          profileImage: profiles.profileImage,
          isGranted: visitors.isGranted,

          totalCount: sql<number>`count(*) OVER ()`,
        })
        .from(visitors)
        .innerJoin(users, eq(visitors.userId, users.id))
        .innerJoin(profiles, eq(visitors.userId, profiles.userId))
        .where(
          and(
            eq(visitors.boothId, boothId),
            or(ilike(users.nim, nameOrNim), ilike(profiles.name, nameOrNim)),
            input.faculty ? eq(profiles.faculty, input.faculty) : sql`TRUE`,
          ),
        );

      const paginatedData = await baseQuery
        .limit(input.limit)
        .offset(input.limit * (input.page - 1));

      const totalItems = paginatedData[0]?.totalCount ?? 0;
      const totalPages = Math.max(1, Math.ceil(totalItems / input.limit));

      const boothData = await ctx.db
        .select({
          visitorCount: lembagaProfiles.visitorCount,
          name: lembagaProfiles.name,
        })
        .from(lembagaProfiles)
        .where(eq(lembagaProfiles.id, boothId))
        .then((res) => res[0]);

      if (!boothData) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Booth not found',
        });
      }

      return {
        data: {
          boothData,
          paginatedData,
        },
        totalItems,
        totalPages,
      };
    }),

  updateLembagaProfile: lembagaProcedure
    .input(updateLembagaProfilePayload)
    .mutation(async ({ ctx, input }) => {
      const lembagaId = ctx.session.user.id;
      const { instagram, description } = input;

      try {
        const updatedProfile = await ctx.db
          .update(lembagaProfiles)
          .set({ instagram, description })
          .where(eq(lembagaProfiles.userId, lembagaId))
          .returning();

        if (updatedProfile.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Lembaga not found',
          });
        }
        return {
          status: 200,
          data: updatedProfile[0],
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update lembaga profile data',
        });
      }
    }),

  getCurrentProfile: lembagaProcedure.query(async ({ ctx }) => {
    const lembagaId = ctx.session.user.id;
    const data = await ctx.db
      .select()
      .from(lembagaProfiles)
      .where(eq(lembagaProfiles.userId, lembagaId));

    if (data.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Lembaga not found',
      });
    }
    return data[0];
  }),

  refreshCurrentToken: lembagaProcedure.mutation(async ({ ctx }) => {
    const lembagaId = ctx.session.user.id;
    const newToken = createToken();
    const newExpiry = new Date(Date.now() + 5 * 60 * 1000);

    try {
      const updatedProfile = await ctx.db
        .update(lembagaProfiles)
        .set({ currentToken: newToken, currentExpiry: newExpiry })
        .where(eq(lembagaProfiles.userId, lembagaId))
        .returning();

      if (updatedProfile.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Lembaga not found',
        });
      }
      return {
        status: 200,
        data: {
          token: newToken,
          expiryDate: newExpiry,
        },
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to refresh token',
      });
    }
  }),
});
