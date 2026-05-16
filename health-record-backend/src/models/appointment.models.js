import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'PatientProfile', 
      required: true },
  doctorId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'DoctorProfile', 
     required: true },
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
     enum: ['INPERSON', 'VIDEO', 'PHONE'] },
  slot: {
    date: { type: Date, required: true },
    startTime: String,
    endTime: String,
    duration: { type: Number, default: 30 } // minutes
  },
  notes: String,
  prescriptionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Prescription' },
  meetingLink: String // Video call URL
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment',appointmentSchema);
