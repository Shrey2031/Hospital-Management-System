import mongoose, {Schema} from "mongoose";

const healthSchema = new Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor',
     required: true },
  facility: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Facility' },
                
    description:{
    type: String,
    },      // "Routine annual checkup"
    recordType: {
    type: String,
    enum: ["consultation", "lab", "prescription", "scan"]
    },

   document:{
    type: String
   },           // Cloudinary URL
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

export const Health  = mongoose.model("Health",healthSchema);