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
  diagnosis: { type: String },
  prescription: { type: String },
  document: { type: String }, // upload on clodinary 
  visitDate: { type: Date, default: Date.now }
  },
  

   
{timeseries:true});

export const Health  = mongoose.model("Health",healthSchema);