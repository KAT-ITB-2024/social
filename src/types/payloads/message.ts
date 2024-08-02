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
  receiverId: z.string(),
  content: z.string(),
});
