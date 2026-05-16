import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// const facilitySchema = new Schema({
  
//     fullname:{
//         type:String,
//         required:true,
//       },
//       email:    
//        { type: String,
//          required: true,
//           unique: true
//          },
//       password: 
//       { type: String, 
//         required: true 
//       },
//       address:{
//         type:String,
//         required:true,
//       },
//       city:{
//         type:String,
//         required:true,
//       },
//       specialisedIn:{
//         type:String,
//         required:true,
//       },

//     role:{ 
//       type: String, 
//       default: 'facility'
//      },
//      phone:{
//       type:Number

//      }

// },{timestamps:true});

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
    },
   
    specialisedIn: {
      type: String,
      required: true,
    },
     phone: {
      type: String,
    },
     doctors: [
      { type: mongoose.Schema.Types.ObjectId,
         ref: 'DoctorProfile' }],
    description: {
      type: String,
    },
     services: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin or doctor
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



export const FacilityProfile = mongoose.model("FacilityProfile",facilitySchema);