import { type UserMatch } from '@katitb2024/database';
import { type Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { type Server, type Socket } from 'socket.io';
import { type RoomChat, type UserQueue } from '~/types/payloads/message';
import { findMatchEvent } from './events/queue';
import { type ServerEventsResolver } from './helper';
import { Redis } from '../redis';
import { createAdapter } from '@socket.io/redis-adapter';
const serverEvents = [findMatchEvent] as const;

export type ServerToClientEvents = {
  match: (match: UserMatch) => void;
};

export type ClientToServerEvents = ServerEventsResolver<typeof serverEvents>;

export type SocketData<AuthRequired = false> = {
  session: AuthRequired extends true ? Session : Session | null;
  match: UserMatch | null;
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
    socket.data.match = null;
    socket.data.matchQueue = null;
    socket.data.roomChat = new Map<string, RoomChat>();
    next();
  });

  io.on('connection', (socket) => {
    if (socket.data.session) {
      console.log('SESSIOn');
      serverEvents.forEach((event) => event(io, socket));
      const userId = socket.data.session.user.id;

      void socket.join(userId);

      socket.on('disconnect', () => {
        void socket.leave(userId);
      });
    } else {
      console.log('NOT SESSION');
    }
  });
};

export function getAdapter() {
  const redisClient = Redis.getClient();
  return createAdapter(redisClient.duplicate(), redisClient.duplicate());
}
