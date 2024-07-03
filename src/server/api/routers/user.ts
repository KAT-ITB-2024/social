import { createTRPCRouter, publicProcedure } from "../trpc";
import { users, roleEnum } from "@katitb2024/database";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const userInsertPayload = z.object({
  nim: z.string(),
  password: z.string(),
  role: z.enum(roleEnum.enumValues),
});

const userUpdatePayload = z.object({
  id: z.string(),
  password: z.string().optional(),
});

const userIdPayload = z.object({
  id: z.string(),
});

export const userRouter = createTRPCRouter({
  addUser: publicProcedure
    .input(userInsertPayload)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db
          .insert(users)
          .values({
            nim: input.nim,
            password: input.password,
            role: input.role,
          })
          .returning();

        // Return success with status code 200
        return {
          status: 200,
          data: "User added successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
        });
      }
    }),

  forgotPassword: publicProcedure
    .input(userUpdatePayload)
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedUser = await ctx.db
          .update(users)
          .set({
            password: input.password,
          })
          .where(eq(users.id, input.id))
          .returning();
        if (!updatedUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        return updatedUser;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
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
        .select()
        .from(users)
        .where(eq(users.id, input.id));
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
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
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return deletedUser;
    }),
});