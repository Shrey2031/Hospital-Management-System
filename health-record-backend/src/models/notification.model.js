import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true },
  type: { 
    type: String, 
    enum: ['APPOINTMENT', 'PRESCRIPTION', 'RECORD', 'REMINDER'],
     default: 'INAPP'
  },
  title: String,
  message: String,
  data: mongoose.Schema.Types.Mixed,
  isRead: {
     type: Boolean,
      default: false },
  channel: { 
    type: String,
     enum: ['EMAIL', 'SMS', 'PUSH', 'INAPP'] }
}, { timestamps: true });
export const Notification = mongoose.model('Notification', notificationSchema);
