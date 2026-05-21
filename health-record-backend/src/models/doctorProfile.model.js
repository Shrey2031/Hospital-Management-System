import mongoose from 'mongoose';



const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
    },
        qualification: {
      type: String,
      required: true,
      trim: true,
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    patients: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'  // References User (patients)
}],

    availability: [
      {
        day: {
          type: String, // Monday, Tuesday, etc
          required: true,
        },
        startTime: {
          type: String, // "09:00"
          required: true,
        },
        endTime: {
          type: String, // "17:00"
          required: true,
        },
      },
    ],

    document: {
      type: String, // Cloudinary URL
    },
    consultationFee: Number,
    workInHospital: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility",
      },
    ],
  },
  { timestamps: true }
);




export const DoctorProfile = mongoose.model('DoctorProfile',doctorSchema);
