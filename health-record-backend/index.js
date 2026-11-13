
// import 'dotenv/config';

// import http from 'http';
// import { Server } from 'socket.io';
// import connectDB from './src/db/connect.js';
// import { app } from './app.js';

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
//   pingTimeout: 60000,
// });

// io.on('connection', (socket) => {
//   console.log('✅ User connected:', socket.id);

//   socket.on('userConnected', ({ userId, role, name }) => {
//     socket.userId = userId;
//     socket.role = role;
//     socket.userName = name;

//     socket.join(userId);
//     console.log(`✅ User ${userId} (${role}) joined: ${socket.id}`);
//   });

//   socket.on('joinConversation', (conversationId) => {
//     socket.join(`conversation_${conversationId}`);
//     console.log(`📱 ${socket.userId} joined conversation: ${conversationId}`);
//   });

//   // ⚠️ TODO: this handler does NOT persist messages to the database.
//   // It broadcasts an in-memory message object (with a Date.now() temp id)
//   // to everyone currently in the room, but nothing is written to Mongo —
//   // so GET /api/v1/messages/ (which MessagesPage.jsx calls to load
//   // history) can never return anything sent through this handler, and a
//   // page refresh loses the message entirely.
//   //
//   // The correct fix is to save via your Message model/controller here
//   // (or call the same service function your REST POST /messages endpoint
//   // uses) BEFORE broadcasting, then broadcast the real saved document
//   // (with its real _id) instead of this temp object. Wiring this needs
//   // your actual Message model/controller — send those over and this can
//   // be completed properly instead of guessing the schema.
//   socket.on('sendMessage', async (data) => {
//     try {
//       console.log(`💬 ${socket.userId} sending message to conversation ${data.conversationId}`);

//       const messageData = {
//         _id: Date.now().toString(), // TEMP — replace with the real saved document's _id
//         sender: {
//           id: socket.userId,
//           name: socket.userName,
//           role: socket.role,
//         },
//         content: data.content,
//         conversationId: data.conversationId,
//         createdAt: new Date(),
//         isRead: false,
//       };

//       socket.to(`conversation_${data.conversationId}`).emit('newMessage', messageData);
//       socket.emit('messageSent', messageData);

//       console.log(`✅ Message delivered to conversation ${data.conversationId}`);
//     } catch (error) {
//       console.error('❌ Message error:', error);
//       socket.emit('messageError', { error: error.message });
//     }
//   });

//   socket.on('typing', (data) => {
//     socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
//       userId: socket.userId,
//       userName: socket.userName,
//       conversationId: data.conversationId,
//       isTyping: true,
//     });
//   });

//   socket.on('stopTyping', (data) => {
//     socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
//       userId: socket.userId,
//       conversationId: data.conversationId,
//       isTyping: false,
//     });
//   });

//   socket.on('messageRead', (data) => {
//     socket.to(`conversation_${data.conversationId}`).emit('messageReadStatus', {
//       messageId: data.messageId,
//       readerId: socket.userId,
//       conversationId: data.conversationId,
//     });
//   });

//   socket.on('userOnline', (conversationId) => {
//     socket.to(`conversation_${conversationId}`).emit('userOnlineStatus', {
//       userId: socket.userId,
//       isOnline: true,
//       conversationId,
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ User disconnected:', socket.id);
//   });
// });

// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('app is running successfully');
// });

// connectDB()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`🚀 Backend + Socket on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log('mongodb connection failed : !!', err);
//   });

// dotenv MUST be the first import — ES module imports execute before this
// file's own body runs, so `import { app } from './app.js'` below would
// otherwise read process.env.CORS_ORIGIN / process.env.PORT before they
// were ever loaded. This was the root cause of CORS_ORIGIN and PORT being
// silently ignored in every environment.
import 'dotenv/config';

import http from 'http';
import { Server } from 'socket.io';
import connectDB from './src/db/connect.js';
import { app } from './app.js';
import Message from './src/models/message.model.js';
import Conversation from './src/models/conversation.model.js';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('userConnected', ({ userId, role, name }) => {
    socket.userId = userId;
    socket.role = role;
    socket.userName = name;

    socket.join(userId);
    console.log(`✅ User ${userId} (${role}) joined: ${socket.id}`);
  });

  socket.on('joinConversation', (conversationId) => {
    socket.join(`conversation_${conversationId}`);
    console.log(`📱 ${socket.userId} joined conversation: ${conversationId}`);
  });

  // Now actually persists — was previously broadcasting an in-memory
  // object with a Date.now() temp id and never writing to the database
  // (flagged in earlier reviews). Only handles the "conversation already
  // exists" case, matching current frontend behavior (MessagesPage.jsx
  // always sends an existing conversationId). Starting a BRAND NEW
  // conversation still has no entry point anywhere in the UI — see the
  // separate note on that; this fix doesn't address it, since that needs
  // new frontend UI, not just a socket-handler change.
  socket.on('sendMessage', async (data) => {
    try {
      const conversation = await Conversation.findOne({
        _id: data.conversationId,
        participants: socket.userId
      });

      if (!conversation) {
        socket.emit('messageError', { error: 'Unauthorized or conversation not found' });
        return;
      }

      const recipients = conversation.participants.filter(
        (p) => p.toString() !== socket.userId.toString()
      );

      const savedMessage = await Message.create({
        sender: socket.userId,
        recipients,
        conversation: conversation._id,
        content: data.content,
        type: 'text'
      });

      await Conversation.findByIdAndUpdate(conversation._id, {
        lastMessage: savedMessage._id,
        updatedAt: new Date()
      });

      const populatedMessage = await Message.findById(savedMessage._id)
        .populate('sender', 'fullname avatar role');

      console.log(`💾 Message saved & delivered to conversation ${data.conversationId}`);

      socket.to(`conversation_${data.conversationId}`).emit('newMessage', populatedMessage);
      socket.emit('messageSent', populatedMessage);
    } catch (error) {
      console.error('❌ Message error:', error);
      socket.emit('messageError', { error: error.message });
    }
  });

  socket.on('typing', (data) => {
    socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
      userId: socket.userId,
      userName: socket.userName,
      conversationId: data.conversationId,
      isTyping: true,
    });
  });

  socket.on('stopTyping', (data) => {
    socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
      userId: socket.userId,
      conversationId: data.conversationId,
      isTyping: false,
    });
  });

  socket.on('messageRead', (data) => {
    socket.to(`conversation_${data.conversationId}`).emit('messageReadStatus', {
      messageId: data.messageId,
      readerId: socket.userId,
      conversationId: data.conversationId,
    });
  });

  socket.on('userOnline', (conversationId) => {
    socket.to(`conversation_${conversationId}`).emit('userOnlineStatus', {
      userId: socket.userId,
      isOnline: true,
      conversationId,
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('app is running successfully');
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Backend + Socket on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('mongodb connection failed : !!', err);
  });