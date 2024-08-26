import { z } from 'zod';

export type UserQueue = {
  userId: string;
};

export type RoomChat = {
  id: string;
  firstUserId: string;
  secondUserId: string;
};

export enum RevealStatusEvent {
  ASK,
  REJECTED,
  ACCEPTED,
}

export type ChatHeaderData = {
  firstUser: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  secondUser: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  lastMessage: string | null;
  isRevealed: boolean;
  isAnonymous: boolean;
  endedAt: Date | null;
};

export type ChatHeader = {
  lastMessage: string | null;
  endedAt: Date | null;
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
};

export const createMessagePayload = z.object({
  userMatchId: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  isRead: z.boolean(),
  content: z.string(),
});

export const sendMessagePayload = z.object({
  userMatchId: z.string(),
  content: z.string(),
});

export const updateVisibilityPayload = z.object({
  userMatchId: z.string(),
});
