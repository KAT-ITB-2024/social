import { notifications } from '@katitb2024/database';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { desc } from 'drizzle-orm';

export const notificationRouter = createTRPCRouter({
  getAllNotifications: publicProcedure.query(async ({ ctx }) => {
    try {
      const notifs = await ctx.db
        .select()
        .from(notifications)
        .orderBy(desc(notifications.createdAt));

      return (
        notifs.map(({ id, createdAt, content }) => {
          return {
            id,
            date: timeAgo(createdAt),
            description: content,
          };
        }) || []
      );
    } catch (e) {
      console.error('Error fetching notifications:', e);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch notifications',
      });
    }
  }),
});

//
function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(Math.abs(seconds) / value);
    if (interval >= 1) {
      const suffix = seconds < 0 ? 'in' : 'ago';
      return `${interval} ${unit}${interval !== 1 ? 's' : ''} ${suffix}`;
    }
  }

  return 'just now';
}
