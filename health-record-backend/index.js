// import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './src/db/connect.js'
import { app } from './app.js';

const server = http.createServer(app);
const io = new Server(server, {     // ✅ Socket.IO server
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
   pingTimeout: 60000,
  corsTimeout: 10000

});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);
  
  // socket.on('join', ({ userId, role }) => {
  //   socket.join(userId);
  //   console.log(`User ${userId} (${role}) joined`);
  // });

    socket.on('userConnected', ({ userId, role, name }) => {
    socket.userId = userId;
    socket.role = role;
    socket.userName = name;
    
    socket.join(userId); // Keep your existing join
    console.log(`✅ User ${userId} (${role}) joined: ${socket.id}`);
  });

   socket.on('joinConversation', (conversationId) => {
    socket.join(`conversation_${conversationId}`);
    console.log(`📱 ${socket.userId} joined conversation: ${conversationId}`);
  });

    socket.on('sendMessage', async (data) => {
    try {
      console.log(`💬 ${socket.userId} sending message to conversation ${data.conversationId}`);
      
      // 🔥 Broadcast to conversation room
      const messageData = {
        _id: Date.now().toString(), // Temp ID, replace with DB ID
        sender: {
          id: socket.userId,
          name: socket.userName,
          role: socket.role
        },
        content: data.content,
        conversationId: data.conversationId,
        createdAt: new Date(),
        isRead: false
      };

       socket.to(`conversation_${data.conversationId}`).emit('newMessage', messageData);
      
      // Confirm to sender
      socket.emit('messageSent', messageData);
      
      console.log(`✅ Message delivered to conversation ${data.conversationId}`);
         } catch (error) {
      console.error('❌ Message error:', error);
      socket.emit('messageError', { error: error.message });
    }
  });

    // 🔥 4. TYPING INDICATOR
  socket.on('typing', (data) => {
    socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
      userId: socket.userId,
      userName: socket.userName,
      conversationId: data.conversationId,
      isTyping: true
    });
  });
    socket.on('stopTyping', (data) => {
    socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
      userId: socket.userId,
      conversationId: data.conversationId,
      isTyping: false
    });
  });

  // 🔥 5. MESSAGE READ
  socket.on('messageRead', (data) => {
    socket.to(`conversation_${data.conversationId}`).emit('messageReadStatus', {
      messageId: data.messageId,
      readerId: socket.userId,
      conversationId: data.conversationId
    });
  });

  // 🔥 6. ONLINE STATUS
  socket.on('userOnline', (conversationId) => {
    socket.to(`conversation_${conversationId}`).emit('userOnlineStatus', {
      userId: socket.userId,
      isOnline: true,
      conversationId
    });
  });
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

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

//   // 🔥 FIXED sendMessage - Saves to DB + Real-time
//   socket.on('sendMessage', async (data) => {
//     try {
//       console.log(`💬 ${socket.userId} sending to ${data.conversationId}:`, data.content);

//       // 🔥 STEP 1: Call HTTP API to SAVE to MongoDB
//       const httpResponse = await fetch('http://localhost:3000/api/v1/messages', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${socket.handshake.auth.token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await httpResponse.json();

//       if (!result.success) {
//         socket.emit('messageError', { error: result.message || 'Failed to save' });
//         return;
//       }

//       // 🔥 STEP 2: Broadcast SAVED message to room
//       const messageData = {
//         message: result.message,  // Full DB-saved message
//         sender: {
//           id: socket.userId,
//           name: socket.userName,
//           role: socket.role
//         }
//       };

//       // Send to ALL in conversation room (including sender for confirmation)
//       socket.to(`conversation_${data.conversationId}`).emit('newMessage', messageData);
//       socket.emit('messageSent', messageData);  // Confirm to sender

//       console.log(`✅ Message SAVED & broadcast to ${data.conversationId}`);
//     } catch (error) {
//       console.error('❌ Socket sendMessage error:', error);
//       socket.emit('messageError', { error: 'Network error' });
//     }
//   });

//   // 🔥 Keep your other handlers (typing, etc.)
//   socket.on('typing', (data) => {
//     socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
//       userId: socket.userId,
//       userName: socket.userName,
//       conversationId: data.conversationId,
//       isTyping: true
//     });
//   });

//   socket.on('stopTyping', (data) => {
//     socket.to(`conversation_${data.conversationId}`).emit('userTyping', {
//       userId: socket.userId,
//       conversationId: data.conversationId,
//       isTyping: false
//     });
//   });

//   socket.on('messageRead', (data) => {
//     socket.to(`conversation_${data.conversationId}`).emit('messageReadStatus', data);
//   });

//   socket.on('userOnline', (conversationId) => {
//     socket.to(`conversation_${conversationId}`).emit('userOnlineStatus', {
//       userId: socket.userId,
//       isOnline: true,
//       conversationId
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ User disconnected:', socket.id);
//   });
// });
const PORT = process.env.PORT || 3000;



app.get('/',(req,resp) => {
    resp.send("app is running successfully")
})



dotenv.config({ path: './.env' }); 

connectDB()
.then(() => {
//    app.listen( PORT, () => {
//           console.log(`server is running at port: ${PORT}`);
//    })
server.listen(PORT, () => {
  console.log(`🚀 Backend + Socket on http://localhost:${PORT}`);
});
})
.catch((err) => {
    console.log("mongodb connection failed : !!",err)
})