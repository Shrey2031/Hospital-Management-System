// import mongoose from "mongoose";

// const prescriptionSchema = new mongoose.Schema({
//  appointmentId: {
//    type: mongoose.Schema.Types.ObjectId, 
//    ref: 'Appointment'
//    },
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//      ref: 'PatientProfile',
//       required: true
//      },
//   doctorId: {
//      type: mongoose.Schema.Types.ObjectId,
//       ref: 'DoctorProfile', 
//       required: true
//      },
//          status: {
//         type: String,
//         enum: ['active', 'completed', 'expired'],
//         default: 'active'
//     },
//     // ✅ NEW: Compliance tracking
//     compliance: {
//         type: Number,
//         default: 0,
//         min: 0,
//         max: 100
//     },
//   medicines: [{
//     name: String,
//     dosage: String,
//     frequency: String,
//     duration: String,
//     instructions: String,
//      quantity: Number,
//         nextDose: Date
//   }],
//    refillRequests: [{
//         date: { type: Date, default: Date.now },
//         pharmacyId: mongoose.Schema.Types.ObjectId,
//         urgent: { type: Boolean, default: false },
//         status: { type: String, enum: ['pending', 'approved', 'delivered'], default: 'pending' }
//     }],
//     // ✅ NEW: Reminders
//     reminders: [Date],
//   instructions: String,
//   followUpDate: Date,
//   fileUrl: String //
// }, { timestamps: true });




// // export const Prescription  = mongoose.model("Prescription", prescriptionSchema);
// // export const Prescription = mongoose.model("Prescription", prescriptionSchema);
// const Prescription = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
// export { Prescription };

import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
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
  status: {
    type: String,
    enum: ['active', 'completed', 'expired'],
    default: 'active'
  },
  compliance: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  medicines: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String,
    quantity: Number,
    nextDose: Date
  }],
  refillRequests: [{
    date: { type: Date, default: Date.now },
    pharmacyId: mongoose.Schema.Types.ObjectId,
    urgent: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'delivered'], default: 'pending' }
  }],
  reminders: [Date],
  instructions: String,
  followUpDate: Date,
  fileUrl: String
}, { timestamps: true });

// `mongoose.models.Prescription || mongoose.model(...)` guards against
// "OverwriteModelError" when this file gets re-imported under nodemon/hot
// reload — kept as-is, it's the right pattern. Removed two dead commented
// export lines that used to sit above it.
const Prescription = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
export { Prescription };