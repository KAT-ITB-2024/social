import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import {
  merchandises,
  merchandiseExchanges,
  merchandiseExchangeDetails,
  profiles,
} from '@katitb2024/database';
import { and, eq, sql } from 'drizzle-orm';
import { z } from 'zod';

import { checkoutPayloadSchema } from '~/types/payloads/merchandise';

export const merchandiseRouter = createTRPCRouter({
  checkoutCart: protectedProcedure
    .input(checkoutPayloadSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      try {
        const result = await ctx.db.transaction(async (trx) => {
          let totalCost = 0;
          let totalItems = 0;

          // Check if all items in the payload are available in the required quantities
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
            .where(eq(profiles.userId, ctx.session.user.id))
            .then((res) => res[0]?.coins);

          if (!userCoins || userCoins < totalCost) {
            return {
              success: false,
              message: 'Transaction not successful: insufficient coins',
              currentCoins: userCoins,
            };
          }

          const now = new Date();
          const userId = ctx.session.user.id;
          await trx
            .update(profiles)
            .set({
              coins: sql`${profiles.coins} - ${totalCost}`,
            })
            .where(eq(profiles.userId, userId));

          // Create merchandise exchange entry with totalItem and totalCoins
          console.log(totalItems);
          console.log(totalCost);
          const exchange = await trx
            .insert(merchandiseExchanges)
            .values({
              userId: userId,
              status: 'Not Taken',
              totalItem: totalItems,
              totalCoins: totalCost,
              createdAt: now,
              updatedAt: now,
            })
            .returning();

          console.log(exchange);
          if (!exchange[0]?.id) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create exchange record',
            });
          }

          // Create exchange details and update stock
          for (const item of input) {
            await trx.insert(merchandiseExchangeDetails).values({
              merchandiseExchangeId: exchange[0].id,
              merchandiseId: item.merchandiseId,
              quantity: item.quantity,
            });

            // Update merchandise stock
            await trx
              .update(merchandises)
              .set({
                stock: sql`${merchandises.stock} - ${item.quantity}`,
              })
              .where(eq(merchandises.id, item.merchandiseId));
          }

          return { success: true, message: 'Checkout successful' };
        });
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred during the checkout process',
        });
      }
    }),

  getOrderDetail: protectedProcedure
    .input(
      z.object({
        exchangeId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      try {
        // Fetch the exchange
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
        // Fetch the exchange details
        const exchangeDetails = await ctx.db
          .select({
            merchandiseExchangeId:
              merchandiseExchangeDetails.merchandiseExchangeId,
            merchandiseId: merchandiseExchangeDetails.merchandiseId,
            merchandiseName: merchandises.name,
            merchandisePrice: merchandises.price,
            merchandisesImage: merchandises.image,
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

        return {
          exchange,
          details: exchangeDetails,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),
});
