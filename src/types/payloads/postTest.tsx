import { z } from 'zod';

export const postTestIdPayload = z.object({
  postTestId: z.string(),
});
