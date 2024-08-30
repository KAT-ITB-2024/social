import { z } from 'zod';

export const getAssignmentByIdPayload = z.object({
  id: z.string(),
});
