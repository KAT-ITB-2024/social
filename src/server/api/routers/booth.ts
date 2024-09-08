import { createTRPCRouter, pesertaProcedure } from '~/server/api/trpc';
import { lembagaProfiles, profiles, visitors } from '@katitb2024/database';
import { and, eq, ilike, inArray } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const boothRouter = createTRPCRouter({
  GetHMPSByFaculty: pesertaProcedure
    .input(
      z.object({
        lembagaName: z.string().default(''),
        faculty: z.string(),
        limit: z.number().min(1).default(10),
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in!',
        });
      }

      try {
        const { lembagaName, faculty, limit, page } = input;
        const offset = (page - 1) * limit;

        const HMPSByFaculty = await ctx.db
          .select({
            id: lembagaProfiles.id,
            name: lembagaProfiles.name,
            logo: lembagaProfiles.logo,
          }) // specify the data needed
          .from(lembagaProfiles)
          .where(
            and(
              ilike(lembagaProfiles.name, `%${lembagaName}%`),
              eq(lembagaProfiles.lembaga, 'HMPS'),
              eq(lembagaProfiles.detailedCategory, faculty),
            ),
          )
          .limit(limit)
          .offset(offset);

        // To calculate max page number for FE
        const numberOfData = HMPSByFaculty.length;
        const totalPage = Math.max(1, Math.ceil(numberOfData / limit));

        return {
          data: HMPSByFaculty,
          nextPage: HMPSByFaculty.length < limit ? undefined : page + 1,
          totalPage: totalPage,
          limit: limit,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch lembagaProfiles',
        });
      }
    }),

  GetUKMByRumpun: pesertaProcedure
    .input(
      z.object({
        lembagaName: z.string().default(''),
        rumpun: z.string(),
        limit: z.number().min(1).default(10),
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in!',
        });
      }

      try {
        const { lembagaName, rumpun, limit, page } = input;
        const offset = (page - 1) * limit;

        const UKMByRumpun = await ctx.db
          .select({
            id: lembagaProfiles.id,
            name: lembagaProfiles.name,
            logo: lembagaProfiles.logo,
          }) // specify the data needed
          .from(lembagaProfiles)
          .where(
            and(
              ilike(lembagaProfiles.name, `%${lembagaName}%`),
              eq(lembagaProfiles.lembaga, 'UKM'),
              eq(lembagaProfiles.detailedCategory, rumpun),
            ),
          )
          .limit(limit)
          .offset(offset);

        // To calculate max page number for FE
        const numberOfData = UKMByRumpun.length;
        const totalPage = Math.max(1, Math.ceil(numberOfData / limit));

        return {
          data: UKMByRumpun,
          nextPage: UKMByRumpun.length < limit ? undefined : page + 1,
          totalPage: totalPage,
          limit: limit,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch lembagaProfiles',
        });
      }
    }),

  GetOtherLembaga: pesertaProcedure
    .input(
      z.object({
        lembagaName: z.string().default(''),
        limit: z.number().min(1).default(10),
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in!',
        });
      }

      try {
        const { lembagaName, limit, page } = input;
        const offset = (page - 1) * limit;

        const otherLembaga = await ctx.db
          .select({
            id: lembagaProfiles.id,
            name: lembagaProfiles.name,
            logo: lembagaProfiles.logo,
          }) // specify the data needed
          .from(lembagaProfiles)
          .where(
            and(
              ilike(lembagaProfiles.name, `%${lembagaName}%`),
              inArray(lembagaProfiles.lembaga, ['BSO', 'Pusat', 'Eksternal']),
            ),
          )
          .limit(limit)
          .offset(offset);

        // To calculate max page number for FE
        const numberOfData = otherLembaga.length;
        const totalPage = Math.max(1, Math.ceil(numberOfData / limit));

        return {
          data: otherLembaga,
          nextPage: otherLembaga.length < limit ? undefined : page + 1,
          totalPage: totalPage,
          limit: limit,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch lembagaProfiles',
        });
      }
    }),

  GetSpecificLembaga: pesertaProcedure
    .input(z.string())
    .query(async ({ ctx, input: lembagaId }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in!',
        });
      }

      try {
        // Check if user has already registered presence for current booth
        const existingPresence = await ctx.db
          .select()
          .from(visitors)
          .where(
            and(
              eq(visitors.id, ctx.session.user.id),
              eq(visitors.boothId, lembagaId),
            ),
          );

        if (!existingPresence) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'User has not taken attendance at this booth',
          });
        }

        const specificLembaga = await ctx.db
          .select()
          .from(lembagaProfiles)
          .where(eq(lembagaProfiles.id, lembagaId))
          .then((result) => result[0]);

        if (!specificLembaga) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Lembaga not found!',
          });
        }
        return specificLembaga;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch lembagaProfiles',
        });
      }
    }),

  // Presensi
  AttendBooth: pesertaProcedure
    .input(
      z.object({
        lembagaId: z.string(),
        insertedToken: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in!',
        });
      }

      const { lembagaId, insertedToken } = input;

      try {
        // Check if user has already registered presence for current booth
        const existingPresence = await ctx.db
          .select()
          .from(visitors)
          .where(
            and(
              eq(visitors.id, ctx.session.user.id),
              eq(visitors.boothId, lembagaId),
            ),
          );

        if (existingPresence) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User have already registered this booth!',
          });
        }

        // Token validation
        const lembagaToken = await ctx.db
          .select({
            currentToken: lembagaProfiles.currentToken,
            currentExpirety: lembagaProfiles.currentExpiry,
          })
          .from(lembagaProfiles)
          .where(eq(lembagaProfiles.id, lembagaId))
          .then((result) => result[0]);

        if (!lembagaToken?.currentToken || !lembagaToken?.currentExpirety) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Lembaga token not found!',
          });
        }

        const now = new Date();
        if (!(now <= lembagaToken.currentExpirety)) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Token expired',
          });
        }

        if (!(lembagaToken.currentToken === insertedToken)) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Token invalid',
          });
        }

        const userId = ctx.session.user.id;
        // Register attendance
        await ctx.db.insert(visitors).values({
          userId: userId,
          boothId: lembagaId,
          createdAt: now,
          updatedAt: now,
        });

        // Fetch current user coin
        const user = await ctx.db
          .select({ coins: profiles.coins })
          .from(profiles)
          .where(eq(profiles.userId, userId))
          .then((result) => result[0]);

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User profile not found!',
          });
        }

        const currentUserCoin = user.coins ?? 0;

        // Add coin to user
        await ctx.db
          .update(profiles)
          .set({ coins: currentUserCoin + 100 })
          .where(eq(profiles.userId, userId));

        // Fetch current visitorCount from lembagaProfiles
        const lembaga = await ctx.db
          .select({ visitorCount: lembagaProfiles.visitorCount })
          .from(lembagaProfiles)
          .where(eq(lembagaProfiles.id, lembagaId))
          .then((result) => result[0]);

        if (!lembaga) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Lembaga Profile not found!',
          });
        }

        const currentVisitorCount = lembaga.visitorCount ?? 0;

        // Add lembaga visitorCount
        await ctx.db
          .update(lembagaProfiles)
          .set({ visitorCount: currentVisitorCount + 1 })
          .where(eq(lembagaProfiles.id, lembagaId));
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch ',
        });
      }
    }),
});
