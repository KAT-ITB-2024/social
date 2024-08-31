import { createTRPCRouter, publicProcedure } from '../trpc';
import { postTests } from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { postTestIdPayload } from '~/types/payloads/postTest';
import { and, eq, isNull, not } from 'drizzle-orm';

export const postTestRouter = createTRPCRouter({
  getAllPostTests: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in',
        });
      }

      const allPostTests = await ctx.db.select().from(postTests);

      return allPostTests;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error occurred while fetching all post-tests',
        cause: error,
      });
    }
  }),
});
