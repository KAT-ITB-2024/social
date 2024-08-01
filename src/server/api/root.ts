// import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
// import { userRouter } from "./routers/user";
import { profileRouter } from './routers/profile';
import { userRouter } from './routers/user';
import { submissionRouter } from './routers/submission';
import { mapDaysRouter } from './routers/mapDays';
import { postTestRouter } from './routers/postTest';
import { warClassRouter } from './routers/warClass';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  // user: userRouter,
  profile: profileRouter,
  user: userRouter,
  submission: submissionRouter,
  mapsDays: mapDaysRouter,
  postTest: postTestRouter,
  warClass: warClassRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
