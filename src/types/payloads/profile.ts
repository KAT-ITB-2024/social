import { z } from 'zod';

export type Profile = {
  id: string;
  userId: string;
  profilePicture: string | null;
};

export const getFriendProfilePayload = z.object({
  userId: z.string(),
});

export const updateProfileImgPayload = z.object({
  profileImage: z.string(),
});

export const updateProfileDataPayload = z.object({
  bio: z.string().nullable(),
  instagram: z.string().nullable(),
  email: z.string().nullable(),
});
