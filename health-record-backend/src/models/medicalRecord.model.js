import mongoose, { Schema } from "mongoose";

const medicalrecordSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientProfile',
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['REPORT', 'PRESCRIPTION', 'IMAGE', 'DOCUMENT', 'NOTE']
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbnail: String,
  fileSize: Number,
  metadata: {
    diagnosis: String,
    date: Date,
    doctorName: String,
    facilityName: String
  },
  access: {
    // These were plain ObjectIds with no `ref`, so .populate('access.doctors')
    // could never resolve them — every other ObjectId field in this schema
    // specifies a ref except these two. Added `ref: 'User'` as a default;
    // confirm this is correct — if doctor/facility access is actually
    // tracked against DoctorProfile/FacilityProfile documents instead
    // (the way Prescription.doctorId refs DoctorProfile), change this to
    // match.
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    facilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    expiresAt: Date
  },
  isPrivate: { type: Boolean, default: true },
  visibility: {
    type: String,
    enum: ["private", "doctor", "facility"],
    default: "private"
  },
  // NOTE: isPrivate (boolean), visibility (enum), and access.doctors/
  // access.facilities (allow-list) are three separate mechanisms all
  // expressing "who can see this record," with nothing here defining
  // which one takes precedence if they disagree. Worth resolving in the
  // records controller — flagging since ambiguous auth logic on a health
  // record is a real access-control risk, not just a style issue.

  diagnosis: {
    type: String
  },

  prescription: { type: String },

  visitDate: { type: Date, default: Date.now }

}, { timestamps: true });

export const MedicalRecord = mongoose.model("MedicalRecord", medicalrecordSchema);