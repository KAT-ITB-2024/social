import { type Profile } from "~/types/profile";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { profiles } from "@katitb2024/database";
import { eq } from "drizzle-orm";

export const profileRouter = createTRPCRouter({
    getAllProfiles: publicProcedure.query(({ctx}) => {
        const results : Profile[] = ctx.db.query.profiles.findMany({})
        return results;
    }),
    getUserProfile: publicProcedure.query(async ({ ctx }) => {
        let userId = ctx.session?.user.id;
    
        if (!userId) {
            userId = 'user123'
            // throw new Error("User not authenticated");
        }
    
        const profile = await ctx.db.select().from(profiles)
            .where(eq(profiles.userId, userId))
        if (!profile) {
            throw new Error("Profile not found");
        }
    
        return profile;
    })
})