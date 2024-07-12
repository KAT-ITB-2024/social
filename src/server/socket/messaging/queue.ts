import { Redis } from '~/server/redis';
import { type UserQueue } from '~/types/payloads/message';

const serializeUserQueue = (queue: UserQueue) => {
  return `${queue.userId}`;
};

const deserializeUserQueue = (raw: string) => {
  return {
    userId: raw,
  };
};

const generateKey = (queue: UserQueue): string => {
  const key = `QUEUE:${queue.userId}`;
  return key;
};

const generateQueueKey = (userId: string) => {
  return `USERQUEUE:${userId}`;
};

export const findMatch = async (queue: UserQueue) => {
  const key = generateKey(queue);
  const redis = Redis.getClient();
  const redlock = Redis.getRedlock();
  const lock = await redlock.acquire([`lock:${key}`], 5000);
  console.log('Lock acquired', lock);

  let result;

  try {
    const keyType = await redis.type(key);
    if (keyType !== 'list' && keyType !== 'none') {
      await redis.del(key);
    }
    const queueLength = await redis.llen(key);

    if (queueLength === 0) {
      const queueKey = generateQueueKey(queue.userId);
      const queueExist = await redis.exists(queueKey);

      if (queueExist !== 0) {
        throw new Error('Queue already exists!');
      }
      await redis.rpush(key, serializeUserQueue(queue));
      await redis.set(queueKey, JSON.stringify(queue));
    } else {
      const match = await redis.lpop(key);
      console.log('Popping match', match);
      console.log(await redis.llen(key));

      if (match === null) {
        throw new Error('Match should not be null!');
      }

      const matchQueue = deserializeUserQueue(match);
      await redis.del(generateQueueKey(matchQueue.userId));

      result = {
        firstPair: matchQueue,
        secondPair: {
          userId: queue.userId,
        },
      };
    }
  } catch (error) {
    console.error('Error', error);
  } finally {
    await lock.release();
    console.log('Lock released!');
  }
  return result;
};
