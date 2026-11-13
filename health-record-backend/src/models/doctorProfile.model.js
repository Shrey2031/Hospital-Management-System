// import mongoose from 'mongoose';



// const doctorSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     specialization: {
//       type: String,
//       required: true,
//     },
//     experience: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//         qualification: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     consultationFee: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     licenseNumber: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     patients: [{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User'  // References User (patients)
// }],

//     availability: [
//       {
//         day: {
//           type: String, // Monday, Tuesday, etc
//           required: true,
//         },
//         startTime: {
//           type: String, // "09:00"
//           required: true,
//         },
//         endTime: {
//           type: String, // "17:00"
//           required: true,
//         },
//       },
//     ],

//     document: {
//       type: String, // Cloudinary URL
//     },
//     consultationFee: Number,
//     workInHospital: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Facility",
//       },
//     ],
//   },
//   { timestamps: true }
// );




// export const DoctorProfile = mongoose.model('DoctorProfile',doctorSchema);

// import mongoose from 'mongoose';

// const doctorSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     specialization: {
//       type: String,
//       required: true,
//     },
//     experience: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     qualification: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     consultationFee: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     // Was declared a second time further down as a bare `consultationFee:
//     // Number` — in a JS object literal the later key silently overwrites
//     // the earlier one, so the required/min constraints above were
//     // completely discarded at runtime. A doctor profile could be saved
//     // with no fee, or a negative one, despite this schema appearing to
//     // enforce both. Removed the duplicate; this is now the only definition.

//     licenseNumber: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     patients: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }],

//     availability: [
//       {
//         day: {
//           type: String,
//           required: true,
//         },
//         startTime: {
//           type: String,
//           required: true,
//         },
//         endTime: {
//           type: String,
//           required: true,
//         },
//       },
//     ],

//     document: {
//       type: String, // Cloudinary URL
//     },
//     workInHospital: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         // Was ref: "Facility" — but the model actually registered by
//         // FacilityProfile.js is named "FacilityProfile", not "Facility".
//         // .populate('workInHospital') would throw MissingSchemaError since
//         // no model named "Facility" is registered anywhere.
//         ref: "FacilityProfile",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// doctorSchema.index({ specialization: 1 });

// export const DoctorProfile = mongoose.model('DoctorProfile', doctorSchema);


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
    // Was declared a second time further down as a bare `consultationFee:
    // Number` — in a JS object literal the later key silently overwrites
    // the earlier one, so the required/min constraints above were
    // completely discarded at runtime. A doctor profile could be saved
    // with no fee, or a negative one, despite this schema appearing to
    // enforce both. Removed the duplicate; this is now the only definition.

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    patients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    availability: [
      {
        day: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],

    document: {
      type: String, // Cloudinary URL
    },
    workInHospital: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // Was ref: "Facility" — but the model actually registered by
        // FacilityProfile.js is named "FacilityProfile", not "Facility".
        // .populate('workInHospital') would throw MissingSchemaError since
        // no model named "Facility" is registered anywhere.
        ref: "FacilityProfile",
      },
    ],
    // Added — facilityController.js's addDoctorToFacility/
    // removeDoctorFromFacility both set/clear `doctor.facilityId`, but
    // this field never existed on the schema, so it was silently dropped
    // on every save (same class of bug as the missing name/logo/rating on
    // FacilityProfile). A doctor added to a facility never actually
    // reflected that on their own document.
    facilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacilityProfile",
      default: null,
    },
  },
  { timestamps: true }
);

doctorSchema.index({ specialization: 1 });

export const DoctorProfile = mongoose.model('DoctorProfile', doctorSchema);