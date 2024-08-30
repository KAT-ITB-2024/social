import { z } from 'zod';

export const RequestResetPasswordPayload = z.object({
  email: z.string().email(),
});

export const ResetPasswordPayload = z.object({
  userId: z.string(),
  token: z.string(),
  newPassword: z.string().min(6), // Adjust the password validation as needed
});
