// models/Conversation.js
import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  // Participants in conversation
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],

  // Conversation type
  type: {
    type: String,
    enum: ['direct', 'group'],
    default: 'direct'
  },

  // Group name (for group chats)
  name: {
    type: String,
    trim: true,
    maxlength: 100
  },

  // Group avatar (for group chats)
  avatar: {
    type: String,
    trim: true
  },

  // Last message in conversation
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },

  // Unread count per participant
  unreadCounts: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  }],

  // Is conversation muted
  muted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Pinned (for important conversations)
  isPinned: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

// 🔥 Indexes
conversationSchema.index({ participants: 1 });
conversationSchema.index({ 'participants_1': 1, updatedAt: -1 });
conversationSchema.index({ lastMessage: 1 });

// 🔥 Virtuals
conversationSchema.virtual('unreadCount').get(function() {
  const userId = this.participants[0]; // Assuming 1:1 for now
  const count = this.unreadCounts.find(uc => uc.user.toString() === userId.toString());
  return count ? count.count : 0;
});

conversationSchema.virtual('otherParticipant', {
  ref: 'User',
  localField: 'participants',
  foreignField: '_id',
  justOne: true,
  options: { match: function(doc) { /* exclude current user */ } }
});

export default mongoose.model('Conversation', conversationSchema);