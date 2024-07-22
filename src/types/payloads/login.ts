import * as z from 'zod';
// Define Zod schema
export const loginPayload = z.object({
  nim: z.string().min(8, { message: 'NIM must be 8 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});
