import { z } from 'zod';

export const EnrollClassPayload = z.object({
  classId: z.string(),
});
