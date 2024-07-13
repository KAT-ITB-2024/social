import { loadEnvConfig } from '@next/env';
import dotenv from 'dotenv';
import { env } from '~/env';
import { getAdapter, initializeSocket, type SocketServer } from './socket';
import { Server } from 'socket.io';
import parser from 'socket.io-msgpack-parser';

// loadEnvConfig(process.cwd());
dotenv.config();
void (() => {
  const port = env.WS_PORT;
  console.log('Initializing redis server on port', port);

  const io: SocketServer = new Server(port, {
    cors: {
      origin: env.NEXT_PUBLIC_API_URL,
      credentials: true,
    },
    parser,
    adapter: getAdapter(),
    transports: ['websocket'],
  });

  io.on('connection', (socket) => {
    console.log(`Connection (${io.engine.clientsCount})`);
    socket.once('disconnect', () => {
      console.log(`Connection (${io.engine.clientsCount})`);
    });
  });

  initializeSocket(io);

  console.log(`WebSocket Server listening on ws://localhost:${port}`);

  process.on('SIGTERM', () => {
    console.log('SIGTERM');

    // Stop Schedule if Exist

    // Close WebSocket Server
    io.close();
  });
});
