import { type Message } from '@katitb2024/database';
import { z } from 'zod';

export type UserQueue = {
  userId: string;
};

export type RoomChat = {
  id: number;
  firstUserId: string;
  secondUserId: string;
};

export type ChatHeaderData = {
  id: string;
  createdAt: Date;
  userMatchId: string;
  senderId: string;
  senderName: string;
  senderImage: string | null;
  receiverId: string;
  receiverName: string;
  receiverImage: string | null;
  isRead: boolean;
  content: string;
  isRevealed: boolean;
};

export type ChatHeader = {
  lastMessage: Message;
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  unreadMessageCount: number;
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
