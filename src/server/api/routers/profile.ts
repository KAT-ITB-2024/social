import { type Profile } from "~/types/profile";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { profiles } from "@katitb2024/database";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  getUserProfile: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    const profile = await ctx.db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId));

    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  }),
});
