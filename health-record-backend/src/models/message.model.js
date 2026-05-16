// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  // Sender of the message
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required'],
    index: true
  },

  // Recipients (array for group messages, single for 1:1)
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'At least one recipient is required']
  }],

  // Conversation this message belongs to
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true
  },

  // Message content (text)
  content: {
    type: String,
    trim: true,
    maxlength: [5000, 'Message cannot exceed 5000 characters']
  },

  // File attachment (optional)
  attachment: {
    url: {
      type: String,
      trim: true
    },
    filename: {
      type: String,
      trim: true,
      maxlength: 255
    },
    size: {
      type: Number, // in bytes
      min: 0
    },
    mimetype: {
      type: String,
      enum: [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'text/plain',
        'audio/mpeg', 'audio/wav', 'audio/ogg'
      ]
    }
  },

  // Message type
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'audio', 'system'],
    default: 'text'
  },

  // Read status
  isRead: {
    type: Boolean,
    default: false
  },

  // When message was read
  readAt: {
    type: Date
  },

  // Message reactions (optional)
  reactions: [{
    emoji: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  // Message status
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'failed'],
    default: 'sent'
  },

  // Deleted for everyone (soft delete)
  deletedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Forwarded from (if forwarded message)
  forwardedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }

}, {
  timestamps: true, // createdAt, updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 🔥 Indexes for performance
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1, createdAt: -1 });
messageSchema.index({ recipients: 1, createdAt: -1 });
messageSchema.index({ isRead: 1, createdAt: -1 });

// 🔥 Virtual for formatted time
// messageSchema.virtual('timeAgo').get(function() {
//   return formatDistanceToNow(this.createdAt, { addSuffix: true });
// });

export default mongoose.model('Message', messageSchema);