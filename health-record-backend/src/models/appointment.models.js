import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
   fullName:{
    type: String,
    required: [true, "Full Name Is Required!"],
   },
   email:{
    type: String,
    required: [true, "Email Is Required!"],
   },
   phone:{
    type: String,
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
   },
   age:{
    type: Number,
    required: [true, "Age Is Required!"],
   },
   gender:{
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male","Female","other"],
   },
    appointment_date: {
    type: String,
    required: [true, "Appointment Date Is Required!"],
  },
    department: {
    type: String,
    required: [true, "Department Name Is Required!"],
  },
    hasVisited: {
    type: Boolean,
    default: false,
  },
  
  doctor:{
    Name:{
      type: String,
      required: [true, "Doctor Name Is Required!"],
     }
    },
   facility:{
    Name:{
      type: String,
      default: "",
     }
   },

  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
  doctorId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor" },
  facilityId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Facility" },

  title:{
    type: String,
    required: [true, "Title Is Required!"],
  },          // "Annual Checkup"
  
  status: {
    type: String,
    enum: ["upcoming", "completed", "cancelled"],
    default: "upcoming"
  },

  createdAt: { type: Date, default: Date.now } ,
 
});


export const Appointment = mongoose.model('Appointment',appointmentSchema);