import mongoose, {Schema} from "mongoose";

const medicalrecordSchema = new Schema({
  patientId: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PatientProfile',
     required: true },
  uploadedBy: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User' },
  title: {
     type: String,
      required: true },
  category: { 
    type: String, 
    enum: ['REPORT', 'PRESCRIPTION', 'IMAGE', 'DOCUMENT', 'NOTE']
  },
  fileUrl: {
     type: String,
      required: true },
  thumbnail: String,
  fileSize: Number,
  metadata: {
    diagnosis: String,
    date: Date,
    doctorName: String,
    facilityName: String
  },
  access: {
    doctors: [mongoose.Schema.Types.ObjectId],
    facilities: [mongoose.Schema.Types.ObjectId],
    expiresAt: Date // Temporary access
  },
  isPrivate: { type: Boolean, default: true },        // Cloudinary URL
  visibility: {
    type: String,
    enum: ["private", "doctor", "facility"],
    default: "private"
  },

  diagnosis: {
    type: String 
  },

  prescription: { type: String },
  
  visitDate: { type: Date, default: Date.now }
  },
  

   
{timestamps:true});

export const MedicalRecord  = mongoose.model("MedicalRecord",medicalrecordSchema);