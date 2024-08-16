import { z } from 'zod';

export const RequestResetPasswordPayload = z.object({
  email: z.string().email(),
});

export const ResetPasswordPayload = z
  .object({
    userId: z.string(),
    token: z.string(),
    newPassword: z.string().min(8, 'Password harus minimal 8 karakter'),
    confirmPassword: z.string().min(8, 'Password harus minimal 8 karakter'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Password yang dimasukkan berbeda dengan sebelumnya!',
    path: ['confirmPassword'],
  });
