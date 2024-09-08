import { type ChatTopic, type GenderEnum } from '../enum/chat';

export type UserQueue = {
  userId: string;
  isAnonymous: boolean;
  isFindingFriend: boolean;
  topic: ChatTopic;
  gender: GenderEnum;
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
