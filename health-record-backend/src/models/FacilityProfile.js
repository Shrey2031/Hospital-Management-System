// import mongoose, {Schema} from "mongoose";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';



// const facilitySchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//      type: {
//       type: String,
//       enum: ["clinic", "hospital", "lab"],
//       required: true,
//     },

//     address: {
//        street: String,
//     city: String,
//     state: String,
//     pincode: String,
//     coordinates: { lat: Number, lng: Number }
//     },
   
//     specialisedIn: {
//       type: String,
//       required: true,
//     },
//      phone: {
//       type: String,
//     },
//      doctors: [
//       { type: mongoose.Schema.Types.ObjectId,
//          ref: 'DoctorProfile' }],
//     description: {
//       type: String,
//     },
//      services: [String],
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // admin or doctor
//     },

//     isApproved: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );



// export const FacilityProfile = mongoose.model("FacilityProfile",facilitySchema);

import mongoose from "mongoose";
// Removed unused imports of `jwt` and `bcrypt`, and the unused named
// `{ Schema }` import — this schema has no password field or token logic
// (facilities authenticate through their linked User document via
// userId), so these were leftover copy-paste from User.js. Harmless at
// runtime, but unused bcrypt in particular adds unnecessary native-module
// load cost on every import of this file.

const facilitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["clinic", "hospital", "lab"],
      required: true,
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: { lat: Number, lng: Number }
      // Note: if you ever want "find nearby facilities" queries, plain
      // {lat, lng} numbers can't be geo-indexed — MongoDB's 2dsphere index
      // needs GeoJSON format ({ type: 'Point', coordinates: [lng, lat] }).
      // Not a bug today, just flagging before you build on top of this.
    },

    specialisedIn: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    doctors: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorProfile' }
    ],
    description: {
      type: String,
    },
    services: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const FacilityProfile = mongoose.model("FacilityProfile", facilitySchema);