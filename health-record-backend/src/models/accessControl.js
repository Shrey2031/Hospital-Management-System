const mongoose = require("mongoose");

const accessControlSchema = new mongoose.Schema(
  {
    recordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
    },

    grantedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientProfile",
      required: true,
    },

    grantedAt: {
      type: Date,
      default: Date.now,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);

// Prevent duplicate access entries
accessControlSchema.index({ recordId: 1, doctorId: 1 }, { unique: true });

module.exports = mongoose.model("AccessControl", accessControlSchema);