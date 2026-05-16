import mongoose from 'mongoose';

const patientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    dob: Date,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    address: String,
    medicalHistory: String,
  },
  { timestamps: true }
);

export const PatientProfile  = mongoose.model("PatientProfile",patientProfileSchema);
