import { TRPCError } from '@trpc/server';
import { createTRPCRouter, pesertaProcedure } from '../trpc';
import { wrappedProfiles } from '@katitb2024/database';
import { eq } from 'drizzle-orm';

export const wrappedRouter = createTRPCRouter({
  getWrapped: pesertaProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not logged in!',
      });
    }

    const oskmWrapped = await ctx.db
      .select()
      .from(wrappedProfiles)
      .where(eq(wrappedProfiles.userId, user.id))
      .limit(1);
    if (!oskmWrapped) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: "User's oskm wrapped not found!",
      });
    }
    return oskmWrapped;
  }),
});
