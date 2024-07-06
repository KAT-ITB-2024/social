import { z } from 'zod';

export type Profile = {
  id: string;
  userId: string;
  profilePicture: string | null;
};

export const profileUpdatePayload = z.object({
  userId: z.string(),
  profileImage: z.string(),
});
