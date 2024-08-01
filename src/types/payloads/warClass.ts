import { z } from 'zod';

export const EnrollClassPayload = z.object({
  userId: z.string(),
  classId: z.string(),
});

export const userPayload = z.object({
  userId: z.string(),
});
