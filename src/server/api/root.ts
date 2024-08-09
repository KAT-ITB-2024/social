// import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
// import { userRouter } from "./routers/user";
import { profileRouter } from './routers/profile';
import { userRouter } from './routers/user';
import { assignmentRouter } from './routers/assignment';
import { submissionRouter } from './routers/submission';
import { postTestRouter } from './routers/postTest';
import { classRouter } from './routers/class';
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
  assignment: assignmentRouter,
  submission: submissionRouter,
  postTest: postTestRouter,
  class: classRouter,
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
