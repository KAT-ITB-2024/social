import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import {
  merchandises,
  merchandiseExchanges,
  merchandiseExchangeDetails,
  profiles,
} from '@katitb2024/database';
import { eq, ilike, sql } from 'drizzle-orm';
import { z } from 'zod';

import { checkoutPayloadSchema } from '~/types/payloads/merchandise';

export const merchandiseRouter = createTRPCRouter({
  checkoutCart: protectedProcedure
    .input(checkoutPayloadSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session || {};
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      try {
        return await ctx.db.transaction(async (trx) => {
          let totalCost = 0;
          let totalItems = 0;

          for (const item of input) {
            const merchandise = await trx
              .select()
              .from(merchandises)
              .where(eq(merchandises.id, item.merchandiseId))
              .then((res) => res[0]);

            if (!merchandise || merchandise.stock < item.quantity) {
              throw new TRPCError({
                code: 'BAD_REQUEST',
                message: `Not enough stock for item ${merchandise?.name}`,
              });
            }

            totalCost += merchandise.price * item.quantity;
            totalItems += item.quantity;
          }

          const userCoins = await trx
            .select({ coins: profiles.coins })
            .from(profiles)
            .where(eq(profiles.userId, user.id))
            .then((res) => res[0]?.coins);

          if (!userCoins || userCoins < totalCost) {
            return {
              success: false,
              message: 'Transaction not successful: insufficient coins',
              currentCoins: userCoins,
            };
          }

          const now = new Date();
          const exchange = await trx
            .insert(merchandiseExchanges)
            .values({
              userId: user.id,
              status: 'Not Taken',
              totalItem: totalItems,
              totalCoins: totalCost,
              createdAt: now,
              updatedAt: now,
            })
            .returning()
            .then((res) => res[0]);

          if (!exchange?.id) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create exchange record',
            });
          }

          for (const item of input) {
            await trx.insert(merchandiseExchangeDetails).values({
              merchandiseExchangeId: exchange.id,
              merchandiseId: item.merchandiseId,
              quantity: item.quantity,
            });

            await trx
              .update(merchandises)
              .set({ stock: sql`${merchandises.stock} - ${item.quantity}` })
              .where(eq(merchandises.id, item.merchandiseId));
          }

          await trx
            .update(profiles)
            .set({
              coins: sql`${profiles.coins} - ${totalCost}`,
            })
            .where(eq(profiles.userId, user.id));

          return { success: true, message: 'Checkout successful' };
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred during the checkout process',
        });
      }
    }),

  getOrderDetail: protectedProcedure
    .input(z.object({ exchangeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { user } = ctx.session || {};
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      try {
        const exchange = await ctx.db
          .select()
          .from(merchandiseExchanges)
          .where(eq(merchandiseExchanges.id, input.exchangeId))
          .then((res) => res[0]);

        if (!exchange) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Merchandise exchange not found',
          });
        }

        const exchangeDetails = await ctx.db
          .select({
            merchandiseExchangeId:
              merchandiseExchangeDetails.merchandiseExchangeId,
            merchandiseId: merchandiseExchangeDetails.merchandiseId,
            merchandiseName: merchandises.name,
            merchandisePrice: merchandises.price,
            merchandiseImage: merchandises.image,
            quantity: merchandiseExchangeDetails.quantity,
          })
          .from(merchandiseExchangeDetails)
          .leftJoin(
            merchandises,
            eq(merchandiseExchangeDetails.merchandiseId, merchandises.id),
          )
          .where(
            eq(merchandiseExchangeDetails.merchandiseExchangeId, exchange.id),
          );

        return { exchange, details: exchangeDetails };
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch order details',
        });
      }
    }),

  getAllMerchandise: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        name: z.string().default(''),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { user } = ctx.session || {};
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      const { page, name } = input;
      const itemsPerPage = 6;
      const offset = (page - 1) * itemsPerPage;

      const res = ctx.db
        .select()
        .from(merchandises)
        .limit(itemsPerPage)
        .offset(offset)
        .where(ilike(merchandises.name, `%${name}%`))
        .orderBy(merchandises.name);

      return res;
    }),

  getOrderHistory: protectedProcedure
    .input(z.object({ page: z.number().min(1).default(1) }))
    .query(async ({ ctx, input }) => {
      const { user } = ctx.session || {};
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      const { page } = input;
      const itemsPerPage = 6;
      const offset = (page - 1) * itemsPerPage;

      const res = await ctx.db
        .select()
        .from(merchandiseExchanges)
        .where(eq(merchandiseExchanges.userId, user.id))
        .limit(itemsPerPage)
        .orderBy(merchandiseExchanges.updatedAt)
        .offset(offset);

      return res;
    }),
});
