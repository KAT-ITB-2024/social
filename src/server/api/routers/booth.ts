import { createTRPCRouter, pesertaProcedure } from '~/server/api/trpc';
import { lembagaProfiles, profiles, visitors } from '@katitb2024/database';
import { and, eq, ilike, inArray, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const boothRouter = createTRPCRouter({
  getHmpsByFaculty: pesertaProcedure
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

  getUkmByRumpun: pesertaProcedure
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

  getLembagaPusat: pesertaProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in yet!',
      });
    }

    const lembaga = await ctx.db
      .select()
      .from(lembagaProfiles)
      .where(eq(lembagaProfiles.lembaga, 'Pusat'));
    return lembaga;
  }),

  GetOtherLembaga: pesertaProcedure
    .input(
      z.object({
        lembagaName: z.string().default(''),
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
        const { lembagaName } = input;

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
          );

        // To calculate max page number for FE
        return otherLembaga;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch lembagaProfiles',
        });
      }
    }),

  getSpecificLembaga: pesertaProcedure
    .input(
      z.object({
        lembagaId: z.string().default(''),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { lembagaId } = input;
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

        const hasVisited = existingPresence.length > 0; // Check if any presence exists

        const specificLembaga = await ctx.db
          .select()
          .from(lembagaProfiles)
          .where(eq(lembagaProfiles.id, lembagaId))
          .then((result) => result[0]);

        return {
          specificLembaga,
          hasVisited,
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch lembagaProfiles',
        });
      }
    }),

  getLembagaExternal: pesertaProcedure.query(async ({ ctx }) => {
    const lembaga = await ctx.db
      .select()
      .from(lembagaProfiles)
      .where(eq(lembagaProfiles.lembaga, 'Eksternal'));
    return lembaga;
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

      // Wrap related updates and queries in a transaction
      await ctx.db.transaction(async (trx) => {
        try {
          const userId = ctx.session.user.id;

          // Check if user has already registered presence for the current booth
          const existingPresence = await trx
            .select()
            .from(visitors)
            .where(
              and(eq(visitors.id, userId), eq(visitors.boothId, lembagaId)),
            );

          if (existingPresence.length > 0) {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'User has already registered this booth!',
            });
          }

          // Token validation (combine token and expiry check in one query)
          const lembagaToken = await trx
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
          if (now > lembagaToken.currentExpirety) {
            throw new TRPCError({
              code: 'FORBIDDEN',
              message: 'Token expired',
            });
          }

          if (lembagaToken.currentToken !== insertedToken) {
            throw new TRPCError({
              code: 'FORBIDDEN',
              message: 'Token invalid',
            });
          }

          // Register attendance in the visitors table
          await trx.insert(visitors).values({
            userId: userId,
            boothId: lembagaId,
            createdAt: now,
            updatedAt: now,
          });

          // Update user coins and retrieve the new value in one query
          const updatedUser = await trx
            .update(profiles)
            .set({ coins: sql`${profiles.coins} + 100` })
            .where(eq(profiles.userId, userId))
            .returning({ coins: profiles.coins })
            .then((result) => result[0]);

          if (!updatedUser) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'User profile not found!',
            });
          }

          // Update lembaga visitor count in one query
          const updatedLembaga = await trx
            .update(lembagaProfiles)
            .set({ visitorCount: sql`${lembagaProfiles.visitorCount} + 1` })
            .where(eq(lembagaProfiles.id, lembagaId))
            .returning({ visitorCount: lembagaProfiles.visitorCount })
            .then((result) => result[0]);

          if (!updatedLembaga) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Lembaga profile not found!',
            });
          }
        } catch (error) {
          console.log(error);
          if (error instanceof TRPCError) {
            throw error;
          }
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to process attendance',
          });
        }
      });
    }),
});
