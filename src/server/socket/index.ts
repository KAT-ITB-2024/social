import { type Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { type Server, type Socket } from 'socket.io';
import { type RoomChat, type UserQueue } from '~/types/payloads/message';

// const serverEvents = [findMatchEvent] as const;

export type UserMatchType = {
  id: string;
  firstUserId: string;
  secondUserId: string;
  createdAt: Date;
};

export type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
};

interface ClientToServerEvents {
  hello: () => void;
}

export type SocketData<AuthRequired = false> = {
  session: AuthRequired extends true ? Session : Session | null;
  match: UserMatchType | null;
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
};
