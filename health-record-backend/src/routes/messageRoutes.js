

import { Router } from "express";
import {
   getConversations,
   getMessages,
   getMessageThread,
   getUnreadCount,
   sendMessage,
   updateMessageStatus,
   deleteMessage
} from "../controllers/message.controller.js";
import { UserverifyJWT } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.middleware.js";

const router = Router();
//  router.use('/send', rateLimit({
//    windowMs: 60 * 1000, // 1 minute
//    max: 30, // 30 messages per minute
//    message: 'Too many messages, slow down!'
//  }));

 // // 🔥 CONVERSATIONS
router.get('/conversations',UserverifyJWT, getConversations); // ?page=1&limit=20&search=doctor

// 🔥 MESSAGES LIST (paginated)
router.get('/', UserverifyJWT, getMessages); // ?conversationId=xxx&page=1&limit=30

// 🔥 SPECIFIC THREAD
router.get('/:conversationId', UserverifyJWT, getMessageThread);

// 🔥 SEND MESSAGE (with file upload)
router.post('/', 
  upload.fields([
    { name: 'attachment', maxCount: 1 }
  ]),
  UserverifyJWT,
  sendMessage
);

// 🔥 MESSAGE ACTIONS
router.patch('/:messageId/read', UserverifyJWT, updateMessageStatus);
router.delete('/:messageId', UserverifyJWT, deleteMessage);
router.get('/unread-count', UserverifyJWT, getUnreadCount);


export default router;