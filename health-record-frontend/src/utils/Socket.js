
// src/utils/socket.js - FIXED URL
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {  // ✅ Backend URL
  withCredentials: true,
  autoConnect: false  // Connect manually
});

export const initSocket = (userId, role) => {
  socket.connect();
  socket.emit('join', { userId, role });
  return socket;
};

export default socket;