import { Redis } from '~/server/redis';
import { type OpenedDays } from '~/types/payloads/map';
export const getOpenedDays = async () => {
  const key = `{EVENT-DAY}`;
  const redis = Redis.getClient();
  const days = await redis.get(key);
  if (!days) {
    return null;
  } else {
    return JSON.parse(days) as OpenedDays[];
  }
};

export const cacheOpenedDays = async (openedDays: OpenedDays[]) => {
  const key = `{EVENT-DAY}`;
  const redis = Redis.getClient();
  try {
    await redis.set(key, JSON.stringify(openedDays));
  } catch (error) {
    console.error(`Error`, error);
  }
};
