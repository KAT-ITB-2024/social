import { createTRPCRouter, lembagaProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { eq, and, sql, like, or } from 'drizzle-orm';
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
      const boothId = ctx.session.user.id;
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
        const updatedProfile = await ctx.db
          .update(profiles)
          .set({
            coins: sql`${profiles.coins} + ${input.coins}`,
          })
          .where(eq(profiles.userId, input.userId))
          .returning();

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
      const nameOrNim = input.nameOrNim ?? '%';
      const boothId = ctx.session.user.id;

      let query;

      if (input.faculty) {
        query = ctx.db
          .select({
            userId: visitors.userId,
            nim: users.nim,
            name: profiles.name,
            faculty: profiles.faculty,
            profileImage: profiles.profileImage,
          })
          .from(visitors)
          .innerJoin(users, eq(visitors.userId, users.id))
          .innerJoin(profiles, eq(visitors.userId, profiles.userId))
          .where(
            and(
              eq(visitors.boothId, boothId),
              eq(profiles.faculty, input.faculty),
              or(like(users.nim, nameOrNim), like(profiles.name, nameOrNim)),
            ),
          );
      } else {
        query = ctx.db
          .select({
            userId: visitors.userId,
            nim: users.nim,
            name: profiles.name,
            faculty: profiles.faculty,
            profileImage: profiles.profileImage,
          })
          .from(visitors)
          .innerJoin(users, eq(visitors.userId, users.id))
          .innerJoin(profiles, eq(visitors.userId, profiles.userId))
          .where(
            and(
              eq(visitors.boothId, boothId),
              or(like(users.nim, nameOrNim), like(profiles.name, nameOrNim)),
            ),
          );
      }

      const allData = await query;
      const totalItems = allData.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / input.limit));
      const data = await query
        .limit(input.limit)
        .offset(input.limit * (input.page - 1));

      return {
        data,
        currentPage: input.page,
        previousPage: input.page > 1 ? input.page - 1 : undefined,
        nextPage: input.page < totalPages ? input.page + 1 : undefined,
        totalItems,
        totalPages,
      };
    }),

  updateLembagaProfile: lembagaProcedure
    .input(updateLembagaProfilePayload)
    .mutation(async ({ ctx, input }) => {
      const lembagaId = ctx.session.user.id;
      const instagram = input.instagram ?? '';
      const description = input.description ?? '';

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
    return {
      data: data[0],
    };
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
