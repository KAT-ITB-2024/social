import { roleEnum, type UserRole } from '@katitb2024/database';
import { z } from 'zod';
export type UserInsertPayload = {
  nim: string;
  password: string;
  role: UserRole;
};

export type UserDeletePayload = {
  id: string;
};
export const userInsertPayload = z.object({
  nim: z.string(),
  password: z.string(),
  role: z.enum(roleEnum.enumValues),
});

export const userUpdatePayload = z.object({
  nim: z.string(),
  password: z.string(),
});

export const userIdPayload = z.object({
  id: z.string(),
});
