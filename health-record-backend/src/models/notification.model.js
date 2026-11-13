// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId,
//      ref: 'User',
//       required: true },
//   type: { 
//     type: String, 
//     enum: ['APPOINTMENT', 'PRESCRIPTION', 'RECORD', 'REMINDER'],
//      default: 'INAPP'
//   },
//   title: String,
//   message: String,
//   data: mongoose.Schema.Types.Mixed,
//   isRead: {
//      type: Boolean,
//       default: false },
//   channel: { 
//     type: String,
//      enum: ['EMAIL', 'SMS', 'PUSH', 'INAPP'] }
// }, { timestamps: true });
// export const Notification = mongoose.model('Notification', notificationSchema);

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['APPOINTMENT', 'PRESCRIPTION', 'RECORD', 'REMINDER']
    // Previously had `default: 'INAPP'` here — 'INAPP' isn't a valid value
    // for `type` (it belongs to `channel` below), so any notification
    // created without an explicit type would fail enum validation on save.
  },
  title: String,
  message: String,
  data: mongoose.Schema.Types.Mixed,
  isRead: {
    type: Boolean,
    default: false
  },
  channel: {
    type: String,
    enum: ['EMAIL', 'SMS', 'PUSH', 'INAPP'],
    default: 'INAPP' // moved here — this is what 'INAPP' actually describes
  }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);