// // models/Conversation.js
// import mongoose from 'mongoose';

// const conversationSchema = new mongoose.Schema({
//   // Participants in conversation
//   participants: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }],

//   // Conversation type
//   type: {
//     type: String,
//     enum: ['direct', 'group'],
//     default: 'direct'
//   },

//   // Group name (for group chats)
//   name: {
//     type: String,
//     trim: true,
//     maxlength: 100
//   },

//   // Group avatar (for group chats)
//   avatar: {
//     type: String,
//     trim: true
//   },

//   // Last message in conversation
//   lastMessage: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Message'
//   },

//   // Unread count per participant
//   unreadCounts: [{
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     count: {
//       type: Number,
//       default: 0,
//       min: 0
//     }
//   }],

//   // Is conversation muted
//   muted: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],

//   // Pinned (for important conversations)
//   isPinned: {
//     type: Boolean,
//     default: false
//   }

// }, {
//   timestamps: true
// });

// // 🔥 Indexes
// conversationSchema.index({ participants: 1 });
// conversationSchema.index({ 'participants_1': 1, updatedAt: -1 });
// conversationSchema.index({ lastMessage: 1 });

// // 🔥 Virtuals
// conversationSchema.virtual('unreadCount').get(function() {
//   const userId = this.participants[0]; // Assuming 1:1 for now
//   const count = this.unreadCounts.find(uc => uc.user.toString() === userId.toString());
//   return count ? count.count : 0;
// });

// conversationSchema.virtual('otherParticipant', {
//   ref: 'User',
//   localField: 'participants',
//   foreignField: '_id',
//   justOne: true,
//   options: { match: function(doc) { /* exclude current user */ } }
// });

// export default mongoose.model('Conversation', conversationSchema);

// models/Conversation.js
import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],

  type: {
    type: String,
    enum: ['direct', 'group'],
    default: 'direct'
  },

  name: {
    type: String,
    trim: true,
    maxlength: 100
  },

  avatar: {
    type: String,
    trim: true
  },

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },

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

  muted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  isPinned: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
conversationSchema.index({ participants: 1 });
// Was `{ 'participants_1': 1, updatedAt: -1 }` — 'participants_1' isn't a
// real field; it looks like MongoDB's auto-generated index-name string got
// pasted in as if it were a field path. Fixed to the actual field.
conversationSchema.index({ participants: 1, updatedAt: -1 });
conversationSchema.index({ lastMessage: 1 });

// ⚠️ Both virtuals below try to answer "relative to the current user," but
// a Mongoose virtual is defined once at the schema level with no access to
// which user is making the request — so neither can work correctly as
// written. Leaving them in place (removing could break code that expects
// the field key to exist) but they should NOT be relied on. The correct
// fix for both is in the conversations controller, where req.user._id is
// actually available:
//
//   const other = conversation.participants.find(
//     (p) => p._id.toString() !== req.user._id.toString()
//   );
//   const myUnread = conversation.unreadCounts.find(
//     (uc) => uc.user.toString() === req.user._id.toString()
//   )?.count || 0;

conversationSchema.virtual('unreadCount').get(function () {
  // BROKEN: participants[0] is just "whoever is first in the array," not
  // "the current viewing user." Returns the wrong count for anyone who
  // isn't participants[0].
  const userId = this.participants[0];
  const count = this.unreadCounts.find(uc => uc.user.toString() === userId.toString());
  return count ? count.count : 0;
});

conversationSchema.virtual('otherParticipant', {
  ref: 'User',
  localField: 'participants',
  foreignField: '_id',
  justOne: true,
  // BROKEN: this match function's body is empty and, even if implemented,
  // virtual-populate match functions don't receive per-request context
  // (like the current user's id) — so this can't correctly express "the
  // other participant, excluding the current user."
  options: { match: function (doc) { /* cannot resolve current user here */ } }
});

export default mongoose.model('Conversation', conversationSchema);