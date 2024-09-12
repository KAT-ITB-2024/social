import { createTRPCRouter, pesertaProcedure } from '../trpc';
import { profiles, users } from '@katitb2024/database';
import { eq, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import {
  getFriendProfilePayload,
  updatePersonalityPayload,
  updateProfileDataPayload,
  updateProfileImgPayload,
} from '~/types/payloads/profile';
import { z } from 'zod';

export const profileRouter = createTRPCRouter({
  getUserProfile: pesertaProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      return null;
    }

    const profile = await ctx.db
      .select({
        profilePic: profiles.profileImage,
        nama: profiles.name,
        fakultas: profiles.faculty,
        jenisKelamin: profiles.gender,
        bio: profiles.bio,
        instagram: profiles.instagram,
        nim: users.nim,
        email: users.email,
      })
      .from(profiles)
      .innerJoin(users, eq(users.id, profiles.userId))
      .where(eq(profiles.userId, userId))
      .then((res) => res[0]);

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Profile not found',
      });
    }

    return profile;
  }),

  getProfileName: pesertaProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) {
      return null;
    }

    const profile = await ctx.db
      .select({
        nama: profiles.name,
      })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .then((res) => res[0]);

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Profile not found',
      });
    }

    return profile.nama.split(' ')[0];
  }),

  getFriendProfile: pesertaProcedure
    .input(getFriendProfilePayload)
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const profile = await ctx.db
        .select({
          profilePic: profiles.profileImage,
          nama: profiles.name,
          fakultas: profiles.faculty,
          jenisKelamin: profiles.gender,
          bio: profiles.bio,
          instagram: profiles.instagram,
          nim: users.nim,
        })
        .from(profiles)
        .innerJoin(users, eq(users.id, profiles.userId))
        .where(eq(profiles.userId, userId))
        .then((res) => res[0]);

      if (!profile) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile not found',
        });
      }

      return profile;
    }),

  updateProfileImg: pesertaProcedure
    .input(updateProfileImgPayload)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized',
        });
      }

      try {
        const updatedProfile = await ctx.db
          .update(profiles)
          .set({
            profileImage: input.profileImage,
          })
          .where(eq(profiles.userId, userId))
          .returning();

        if (updatedProfile.length == 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Profile not found',
          });
        }

        return updatedProfile;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update profile image',
          cause: error,
        });
      }
    }),

  getOthersProfile: pesertaProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const profile = await ctx.db
        .select()
        .from(profiles)
        .where(eq(sql`${input.userId}`, profiles.userId));
      if (profile.length < 1) {
        return undefined;
      }
      return profile;
    }),

  updateProfileData: pesertaProcedure
    .input(updateProfileDataPayload)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized',
        });
      }

      const { bio, email, instagram } = input;

      try {
        // Start a transaction
        const result = await ctx.db.transaction(async (trx) => {
          const updatedProfile = await trx
            .update(profiles)
            .set({
              instagram,
              bio,
            })
            .where(eq(profiles.userId, userId))
            .returning();

          const updatedUser = await trx
            .update(users)
            .set({
              email,
            })
            .where(eq(users.id, userId))
            .returning();

          if (updatedProfile.length == 0 || updatedUser.length == 0) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'User or Profile not found',
            });
          }

          return { updatedProfile, updatedUser };
        });

        return result.updatedProfile;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update profile data',
        });
      }
    }),
  updateUserPersonality: pesertaProcedure
    .input(updatePersonalityPayload)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized',
        });
      }

      const { personality } = input;

      try {
        const updatedProfile = await ctx.db
          .update(profiles)
          .set({
            lastMBTI: personality,
          })
          .where(eq(profiles.userId, userId))
          .returning();

        if (updatedProfile.length == 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Profile not found',
          });
        }

        return updatedProfile;
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update Personality',
        });
      }
    }),
  getUserCoin: pesertaProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });
    }

    const coin = await ctx.db
      .select({
        coins: profiles.coins,
      })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .then((res) => res[0]);

    if (!coin) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Coin not found',
      });
    }

    return coin;
  }),
});
