import { Message, type UserMatch } from '@katitb2024/database';
import { type Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { type Server, type Socket } from 'socket.io';
import { RevealStatusEvent, type RoomChat } from '~/types/enums/message';
import {
  cancelMatchEvent,
  checkMatchEvent,
  endMatchEvent,
  findMatchEvent,
} from './events/queue';
import { type ServerEventsResolver } from './helper';
import { Redis } from '../redis';
import { createAdapter } from '@socket.io/redis-adapter';
import {
  anonTypingEvent,
  askRevealEvent,
  isTypingEvent,
  messageEvent,
} from './events/message';
import { UserQueue } from '~/types/payloads/message';
const serverEvents = [
  findMatchEvent,
  checkMatchEvent,
  messageEvent,
  cancelMatchEvent,
  endMatchEvent,
  askRevealEvent,
  isTypingEvent,
  anonTypingEvent,
] as const;

export type ServerToClientEvents = {
  match: (match: UserMatch) => void;
  isTyping: (id: string) => void;
  anonIsTyping: (id: string) => void;
  add: (message: Message) => void;
  askReveal: (
    match: UserMatch,
    type: RevealStatusEvent,
    otherProfile:
      | { name: string; profilepic: string | null; userId: string }[]
      | null,
  ) => void;
  endMatch: (match: UserMatch) => void;
};

export type ClientToServerEvents = ServerEventsResolver<typeof serverEvents>;

export type SocketData<AuthRequired = false> = {
  session: AuthRequired extends true ? Session : Session | null;
  match: UserMatch | undefined;
  matchQueue: UserQueue | null;
  roomChat: Map<string, RoomChat>;
};
export type SocketServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData<boolean>
>;

interface InterServerEvents {
  ping: () => void;
}
export type SocketClientInServer<AuthRequired = false> = Socket<
  never,
  ServerToClientEvents,
  InterServerEvents,
  SocketData<AuthRequired>
>;

export const initializeSocket = (io: SocketServer) => {
  io.use((socket, next) => {
    getSession({ req: socket.request })
      .then((session) => {
        socket.data.session = session;
        next();
      })
      .catch(next);
  });

  io.use((socket, next) => {
    socket.data.match = undefined;
    socket.data.matchQueue = null;
    socket.data.roomChat = new Map<string, RoomChat>();
    next();
  });

  io.on('connection', (socket) => {
    if (socket.data.session) {
      serverEvents.forEach((event) => event(io, socket));
      const userId = socket.data.session.user.id;

      void socket.join(userId);

      socket.on('disconnect', () => {
        void socket.leave(userId);
      });
    }
  });
};

export function getAdapter() {
  const redisClient = Redis.getClient();
  return createAdapter(redisClient.duplicate(), redisClient.duplicate());
}
