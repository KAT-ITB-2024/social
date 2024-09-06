import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import {
  merchandises,
  merchandiseExchanges,
  merchandiseExchangeDetails,
  merchandiseCarts,
  profiles,
} from '@katitb2024/database';
import { and, eq, sql } from 'drizzle-orm';
import { z } from 'zod';

export const merchandiseRouter = createTRPCRouter({
  addMerchToCart: protectedProcedure
    .input(
      z.object({
        merchandiseId: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const merchandise = await ctx.db
        .select()
        .from(merchandises)
        .where(eq(merchandises.id, input.merchandiseId))
        .then((res) => res[0]);

      if (!merchandise || merchandise.stock < input.quantity) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Not enough stock available',
        });
      }

      try {
        await ctx.db.insert(merchandiseCarts).values({
          userId: ctx.session.user.id,
          merchandiseId: input.merchandiseId,
          quantity: input.quantity,
          createdAt: new Date(),
        });

        return { status: 200, message: 'Added to cart successfully' };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),

  checkoutCart: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User is not logged in',
      });
    }

    try {
      const result = await ctx.db.transaction(async (trx) => {
        const cartItems = await trx
          .select()
          .from(merchandiseCarts)
          .where(eq(merchandiseCarts.userId, ctx.session.user.id));

        if (cartItems.length === 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cart is empty',
          });
        }

        let totalCost = 0;
        // Check if all items in the cart are available in the required quantities
        for (const item of cartItems) {
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
        }

        console.log(totalCost);

        const userCoins = await trx
          .select({ coins: profiles.coins })
          .from(profiles)
          .where(eq(profiles.userId, ctx.session.user.id))
          .then((res) => res[0]?.coins);

        console.log(userCoins);
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

        // Create merchandise exchange entry
        const exchange = await trx
          .insert(merchandiseExchanges)
          .values({
            userId: userId,
            status: 'Not Taken',
            createdAt: now,
            updatedAt: now,
          })
          .returning();

        if (!exchange[0]?.id) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create exchange record',
          });
        }

        // Create exchange details and update stock
        for (const item of cartItems) {
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

        // Clear the cart after successful checkout
        await trx
          .delete(merchandiseCarts)
          .where(eq(merchandiseCarts.userId, userId));

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
  viewMyCart: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User is not logged in',
      });
    }

    try {
      const cartItems = await ctx.db
        .select({
          merchandiseId: merchandiseCarts.merchandiseId,
          quantity: merchandiseCarts.quantity,
          merchandiseName: merchandises.name,
          price: merchandises.price,
          image: merchandises.image,
        })
        .from(merchandiseCarts)
        .leftJoin(
          merchandises,
          eq(merchandiseCarts.merchandiseId, merchandises.id),
        )
        .where(eq(merchandiseCarts.userId, ctx.session.user.id))
        .execute();

      if (cartItems.length === 0) {
        return {
          success: true,
          message: 'Your cart is empty',
          cartItems: [],
        };
      }

      return {
        success: true,
        message: 'Cart items retrieved successfully',
        cartItems: cartItems,
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve cart items',
      });
    }
  }),

  removeMerchFromCart: protectedProcedure
    .input(
      z.object({
        merchandiseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not logged in',
        });
      }

      try {
        const result = await ctx.db
          .delete(merchandiseCarts)
          .where(
            and(
              eq(merchandiseCarts.merchandiseId, input.merchandiseId),
              eq(merchandiseCarts.userId, ctx.session.user.id),
            ),
          )
          .execute();

        if (result.count === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Item not found or already removed',
          });
        }

        return {
          success: true,
          message: 'Item removed from cart successfully',
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to remove item from cart',
        });
      }
    }),
});
