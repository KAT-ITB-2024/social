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
