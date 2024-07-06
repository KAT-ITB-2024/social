import { createTRPCRouter, publicProcedure } from '../trpc';
import { profiles } from '@katitb2024/database';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { profileUpdatePayload } from '~/types/payloads/profile';

export const profileRouter = createTRPCRouter({
  getUserProfile: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });
    }

    const profile = await ctx.db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId));

    if (!profile) {
      throw new Error('Profile not found');
    }

    return profile;
  }),
  updateUserProfile: publicProcedure
    .input(profileUpdatePayload)
    .mutation(async ({ ctx, input }) => {
      const updatedProfile = await ctx.db
        .update(profiles)
        .set({
          profileImage: input.profileImage,
        })
        .where(eq(profiles.userId, input.userId))
        .returning();

      if (!updatedProfile) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }

      return updatedProfile;
    }),
});
