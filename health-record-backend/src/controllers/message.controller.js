// controllers/messageController.js
import {asyncHandler} from '../utils/asyncHandler.js';
import Message from '../models/message.model.js';
import { User} from '../models/users.models.js';
import Conversation from '../models/conversation.model.js';
import mongoose from 'mongoose';

// export const getConversations = asyncHandler(async (req, res) => {
//   const userId = req.user._id;
//   const { page = 1, limit = 20, search = '' } = req.query;

//   // 🔥 Optimized aggregation pipeline
//   const conversations = await Conversation.aggregate([
//     { $match: { participants: mongoose.Types.ObjectId(userId) } },
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'participants',
//         foreignField: '_id',
//         as: 'participants',
//         pipeline: [
//           { $match: { _id: { $ne: mongoose.Types.ObjectId(userId) } } },
//           { $project: { name: 1, email: 1, avatar: 1, role: 1 } }
//         ]
//       }
//     },
//     {
//       $lookup: {
//         from: 'messages',
//         localField: 'lastMessage',
//         foreignField: '_id',
//         as: 'lastMessage',
//         pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }]
//       }
//     },
//     { $unwind: { path: '$lastMessage', preserveNullAndEmptyArrays: true } },
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'lastMessage.sender',
//         foreignField: '_id',
//         as: 'lastMessage.sender'
//       }
//     },
//     { $unwind: { path: '$lastMessage.sender', preserveNullAndEmptyArrays: true } },
//     {
//       $addFields: {
//         unreadCount: {
//           $cond: {
//             if: { $eq: ['$lastMessage.sender._id', mongoose.Types.ObjectId(userId)] },
//             then: 0,
//             else: { $size: { $ifNull: ['$unreadCounts', []] } }
//           }
//         },
//         otherParticipant: { $arrayElemAt: ['$participants', 0] }
//       }
//     },
//     {
//       $match: {
//         $or: [
//           { 'otherParticipant.name': { $regex: search, $options: 'i' } },
//           { 'lastMessage.content': { $regex: search, $options: 'i' } }
//         ]
//       }
//     },
//     { $sort: { updatedAt: -1 } },
//     { $skip: (page - 1) * limit },
//     { $limit: parseInt(limit) },
//     {
//       $project: {
//         participants: 0,
//         unreadCounts: 0,
//         'lastMessage.__v': 0
//       }
//     }
//   ]);

//   const total = await Conversation.countDocuments({ participants: userId });

//   res.json({
//     success: true,
//     conversations,
//     pagination: {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       total,
//       pages: Math.ceil(total / limit),
//       hasNext: parseInt(page) * parseInt(limit) < total
//     }
//   });
// });

export const getConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id; // This is already an ObjectId
  const { page = 1, limit = 20, search = '' } = req.query;

  // 🔥 Fixed aggregation pipeline - use userId directly
  const conversations = await Conversation.aggregate([
    { $match: { participants: userId } }, // ✅ Fixed: use userId directly
    {
      $lookup: {
        from: 'users',
        localField: 'participants',
        foreignField: '_id',
        as: 'participants',
        pipeline: [
          { $match: { $expr: { $ne: ['$_id', userId] } } }, // ✅ Fixed: use $expr for comparison
          { $project: { name: 1, email: 1, avatar: 1, role: 1 } }
        ]
      }
    },
    {
      $lookup: {
        from: 'messages',
        localField: 'lastMessage',
        foreignField: '_id',
        as: 'lastMessage',
        pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }]
      }
    },
    { $unwind: { path: '$lastMessage', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'lastMessage.sender',
        foreignField: '_id',
        as: 'lastMessage.sender'
      }
    },
    { $unwind: { path: '$lastMessage.sender', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        unreadCount: {
          $cond: {
            if: { $eq: ['$lastMessage.sender._id', userId] }, // ✅ Fixed: use userId directly
            then: 0,
            else: { $size: { $ifNull: ['$unreadCounts', []] } }
          }
        },
        otherParticipant: { $arrayElemAt: ['$participants', 0] }
      }
    },
    {
      $match: {
        $or: [
          { 'otherParticipant.name': { $regex: search, $options: 'i' } },
          { 'lastMessage.content': { $regex: search, $options: 'i' } }
        ]
      }
    },
    { $sort: { updatedAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: parseInt(limit) },
    {
      $project: {
        participants: 0,
        unreadCounts: 0,
        'lastMessage.__v': 0
      }
    }
  ]);

  // ✅ Also fix the countDocuments
  const total = await Conversation.countDocuments({ participants: userId });
  
  res.json({
    success: true,
    conversations,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
      hasNext: parseInt(page) * parseInt(limit) < total
    }
  });
});
export const getMessages = asyncHandler(async (req, res) => {
  const { conversationId, page = 1, limit = 30 } = req.query;
  const userId = req.user._id.toString();

  if (!conversationId) {
    return res.status(400).json({
      success: false,
      message: 'Conversation ID is required'
    });
  }

  // 🔥 Verify user is in conversation
  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: userId
  });
  
  if (!conversation) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized access to conversation'
    });
  }

  const messages = await Message.find({ conversation: conversationId })
    .populate('sender', 'name avatar role')
    .populate('attachment', 'url filename size mimetype')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip((page - 1) * limit);

  const total = await Message.countDocuments({ conversation: conversationId });

  // 🔥 Mark messages as read for current user
  const unreadMessages = await Message.updateMany(
    {
      conversation: conversationId,
      recipients: userId,
      isRead: false,
      sender: { $ne: userId }
    },
    { isRead: true, readAt: new Date() }
  );

  res.json({
    success: true,
    messages: messages.reverse(), // Chronological order
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    unreadCount: unreadMessages.modifiedCount
  });
});

export const getMessageThread = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  // 🔥 Single optimized query
  const [conversation, messages] = await Promise.all([
    Conversation.findOne({ _id: conversationId, participants: userId })
      .populate('participants', 'name email avatar role'),
    
    Message.find({ conversation: conversationId })
      .populate('sender', 'name avatar role')
      .populate('attachment', 'url filename size mimetype')
      .sort({ createdAt: 1 })
      .limit(100) // Prevent memory issues
  ]);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found'
    });
  }

  res.json({
    success: true,
    conversation,
    messages,
    messageCount: messages.length
  });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, content, conversationId, attachment } = req.body;
  const senderId = req.user._id;

  // 🔥 Input validation
  if (!content?.trim() && !attachment) {
    return res.status(400).json({
      success: false,
      message: 'Message content or attachment is required'
    });
  }

  if (!recipientId && !conversationId) {
    return res.status(400).json({
      success: false,
      message: 'Recipient or conversation is required'
    });
  }

  let conversation;

  // 🔥 Create or get conversation
  if (!conversationId) {
    // Check if conversation already exists
    conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId], $size: 2 }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
        type: 'direct'
      });
    }
  } else {
    conversation = await Conversation.findById(conversationId);
    if (!conversation?.participants.includes(senderId)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to send message in this conversation'
      });
    }
  }

  // 🔥 Create message with validation
  const message = await Message.create({
    sender: senderId,
    recipients: conversation.type === 'direct' ? [recipientId] : conversation.participants,
    conversation: conversation._id,
    content: content?.trim(),
    attachment: attachment ? {
      url: attachment.url,
      filename: attachment.filename,
      size: attachment.size,
      mimetype: attachment.mimetype
    } : undefined,
    type: attachment ? 'file' : 'text'
  });

  // 🔥 Update conversation
  await Conversation.findByIdAndUpdate(conversation._id, {
    lastMessage: message._id,
    updatedAt: new Date()
  }, { new: true });

  // 🔥 Populate for response
  const populatedMessage = await Message.findById(message._id)
    .populate('sender', 'name avatar role')
    .populate('conversation', 'participants type');

  // 🔥 Emit via Socket.IO if available
  if (req.io) {
    const messageData = {
      message: populatedMessage,
      sender: req.user
    };
    
    // Emit to conversation room
    req.io.to(`conversation_${conversation._id}`).emit('newMessage', messageData);
  }

  res.status(201).json({
    success: true,
    message: populatedMessage
  });
});

export const updateMessageStatus = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const message = await Message.findOneAndUpdate(
    { _id: messageId, recipients: userId, isRead: false },
    { 
      isRead: true, 
      readAt: new Date(),
      'status': 'read'
    },
    { new: true }
  ).populate('sender', 'name avatar role');

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found or already read'
    });
  }

  res.json({
    success: true,
    message
  });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const message = await Message.findById(messageId);
  
  if (!message || !message.recipients.includes(userId)) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  // 🔥 Soft delete - mark as deleted for this user
  await Message.findByIdAndUpdate(messageId, {
    $addToSet: { deletedFor: userId }
  });

  res.json({
    success: true,
    message: 'Message deleted successfully'
  });
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const unreadCount = await Message.countDocuments({
    recipients: userId,
    isRead: false,
    sender: { $ne: userId }
  });

  res.json({
    success: true,
    unreadCount
  });
});