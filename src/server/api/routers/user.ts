import { createTRPCRouter, publicProcedure } from '../trpc';
import { users } from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { hash } from 'bcrypt';
import {
  userIdPayload,
  userInsertPayload,
  userUpdatePayload,
} from '~/types/payloads/user';

export const userRouter = createTRPCRouter({
  addUser: publicProcedure
    .input(userInsertPayload)
    .mutation(async ({ ctx, input }) => {
      const password = await hash(input.password, 10);
      try {
        await ctx.db
          .insert(users)
          .values({
            nim: input.nim,
            password,
            role: input.role,
          })
          .returning();

        // Return success with status code 200
        return {
          status: 200,
          data: 'User added successfully',
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),

  forgotPassword: publicProcedure
    .input(userUpdatePayload)
    .mutation(async ({ ctx, input }) => {
      const nim = ctx.session?.user.nim;
      if (!nim) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'NIM not found in this session!',
        });
      }
      try {
        const hashedPassword = await hash(input.password, 10);
        const updatedUser = await ctx.db
          .update(users)
          .set({
            password: hashedPassword,
          })
          .where(eq(users.nim, nim))
          .returning();
        if (!updatedUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }
        return updatedUser;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
        });
      }
    }),

  // Get all users
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.db.select().from(users);
    return allUsers;
  }),

  // Get a user by ID
  getUserById: publicProcedure
    .input(userIdPayload)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db
        .select({ id: users.id, nim: users.nim, role: users.role })
        .from(users)
        .where(eq(users.id, input.id));
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }
      return user;
    }),
  // Delete a user
  deleteUser: publicProcedure
    .input(userIdPayload)
    .mutation(async ({ ctx, input }) => {
      const deletedUser = await ctx.db
        .delete(users)
        .where(eq(users.id, input.id))
        .returning();
      if (!deletedUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }
      return deletedUser;
    }),
});
