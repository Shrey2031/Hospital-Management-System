// import mongoose from 'mongoose';

// const appointmentSchema = new mongoose.Schema({
//   patientId: {
//      type: mongoose.Schema.Types.ObjectId,
//       ref: 'PatientProfile', 
//       required: true },
//   doctorId: {
//      type: mongoose.Schema.Types.ObjectId, 
//      ref: 'DoctorProfile', 
//      required: true },
//   facilityId: {
//      type: mongoose.Schema.Types.ObjectId,
//       ref: 'FacilityProfile'
//      },
//   status: { 
//     type: String, 
//     enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
//     default: 'PENDING'
//   },
//   type: { 
//     type: String,
//      enum: ['INPERSON', 'VIDEO', 'PHONE'] },
//   slot: {
//     date: { type: Date, required: true },
//     startTime: String,
//     endTime: String,
//     duration: { type: Number, default: 30 } // minutes
//   },
//   notes: String,
//   prescriptionId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Prescription' },
//   meetingLink: String // Video call URL
// }, { timestamps: true });

// export const Appointment = mongoose.model('Appointment',appointmentSchema);

import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientProfile',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorProfile',
    required: true
  },
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FacilityProfile'
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  type: {
    type: String,
    // Was 'INPERSON' (no underscore) — every frontend booking form sends
    // 'IN_PERSON', so every in-person booking failed enum validation.
    // Aligned to what the frontend actually sends.
    enum: ['IN_PERSON', 'VIDEO', 'PHONE']
  },
  slot: {
    date: { type: Date, required: true },
    startTime: String,
    endTime: String,
    duration: { type: Number, default: 30 } // minutes
  },
  notes: String,
  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  meetingLink: String // Video call URL
}, { timestamps: true });

// No indexes existed on this schema despite patientId/doctorId + slot.date
// being the core query pattern for a scheduling system ("my appointments",
// "doctor's schedule for date X"). Added the obvious ones, plus a compound
// index that at least prevents the exact-duplicate-slot case of double
// booking. True overlap prevention (different but conflicting time ranges)
// still needs to be enforced in the controller at creation time — an index
// alone can't express that.
appointmentSchema.index({ patientId: 1, 'slot.date': 1 });
appointmentSchema.index({ doctorId: 1, 'slot.date': 1 });
// Corrected from a plain unique index: without partialFilterExpression, a
// CANCELLED appointment would still occupy its slot and incorrectly block
// rebooking the same doctor/date/time — cancelling should free the slot.
// This only enforces uniqueness among appointments that are still "live."
// Same caveat as User.username: if duplicate active bookings already
// exist for the same doctor/date/time, this index will fail to build
// until that data is cleaned up.
appointmentSchema.index(
  { doctorId: 1, 'slot.date': 1, 'slot.startTime': 1 },
  { unique: true, partialFilterExpression: { status: { $in: ['PENDING', 'CONFIRMED', 'COMPLETED'] } } }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);

