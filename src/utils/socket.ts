import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import parser from 'socket.io-msgpack-parser';
import { env } from '~/env.cjs';
import {
  type ClientToServerEvents,
  type ServerToClientEvents,
} from '~/server/socket';

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;

export const socket: SocketClient = io(env.NEXT_PUBLIC_WS_URL, {
  withCredentials: false,
  parser,
  transports: ['websocket'],
  autoConnect: false,
});
