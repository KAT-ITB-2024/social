import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { profileRouter } from './routers/profile';
import { userRouter } from './routers/user';
import { assignmentRouter } from './routers/assignment';
import { submissionRouter } from './routers/submission';
import { classRouter } from './routers/class';
import { messageRouter } from './routers/message';
import { authRouter } from './routers/auth';
import { leaderboardRouter } from './routers/leaderboard';
import { storageRouter } from './routers/storage';
import { attendanceRouter } from './routers/attendance';
import { mapRouter } from './routers/map';
import { notificationRouter } from './routers/notification';
import { wrappedRouter } from './routers/wrapped';
import { merchandiseRouter } from './routers/merchandises';
import { boothRouter } from './routers/booth';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  user: userRouter,
  assignment: assignmentRouter,
  attendance: attendanceRouter,
  submission: submissionRouter,
  class: classRouter,
  message: messageRouter,
  notification: notificationRouter,
  leaderboard: leaderboardRouter,
  auth: authRouter,
  storage: storageRouter,
  map: mapRouter,
  wrapped: wrappedRouter,
  merchandises: merchandiseRouter,
  booth: boothRouter,
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
