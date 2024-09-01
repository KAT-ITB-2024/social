import { type Assignment } from '@katitb2024/database';
import { Redis } from '~/server/redis';

export const generateAssignmentKey = (id: string) => {
  return `{ASSIGNMENT:${id}}`;
};
export const getAssignmentDetails = async (assignmentId: string) => {
  const key = generateAssignmentKey(assignmentId);
  const redis = Redis.getClient();
  const redlock = Redis.getRedlock();
  const lock = await redlock.acquire([`lock:${key}`], 5000);

  let res: string | null = null; // Inisialisasi dengan null atau string kosong

  try {
    const assignment = await redis.get(key);
    if (!assignment) {
      return ''; // Jika assignment tidak ada, langsung return string kosong
    } else {
      res = JSON.parse(assignment);
    }
  } catch (error) {
    console.error(`Error`, error);
  } finally {
    await lock.release();
  }

  return res;
};

export const cacheAssignmentDetails = async (assignment: Assignment) => {
  const key = generateAssignmentKey(assignment.id);
  const redis = Redis.getClient();
  const redlock = Redis.getRedlock();
  const lock = await redlock.acquire([`lock:${key}`], 5000);
  try {
    await redis.set(key, JSON.stringify(assignment));
  } catch (error) {
    console.error('Error', error);
  } finally {
    await lock.release();
  }
};
