import { getAdapter, initializeSocket, type SocketServer } from './socket';
import { Server } from 'socket.io';
import parser from 'socket.io-msgpack-parser';
// import { loadEnvFile } from 'process';

// loadEnvFile('.env');
// dotenv.config();
const startServer = () => {
  console.log('start server');
  const port = process.env.WS_PORT ?? '3009';
  const io: SocketServer = new Server(parseInt(port, 10), {
    cors: {
      origin: process.env.NEXT_PUBLIC_API_URL,
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

  // On SIGTERM
  process.on('SIGTERM', () => {
    console.log('SIGTERM');

    // Stop Schedule if Exist

    // Close WebSocket Server
    io.close();
  });
};

startServer();
