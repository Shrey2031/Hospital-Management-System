import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const doctorSchema = new mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    uniq:true,
  },
  password:{
     type:String,
      required:true
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true,
      },
    role:{ 
      type: String, 
      default: 'doctor' 
    },
  specialization:{
    type:String,
    required:true,
  },
  experienceInyears:{
    type:Number,
    default:0,
  },
  avatar:{
    type:String,
    required:true // document upload
  },
  workInHospital:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Facility",
    }
  ]

},{timestamps:true});


doctorSchema.pre("save",async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10)
  next();
  
})

doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

doctorSchema.methods.generateAccessToken = function(){
 return jwt.sign(
      {
          _id:this._id,
          email: this.email,
          username: this.username, 
          // fullname:this.fullname   
      
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  ) 
}
doctorSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id:this._id,
      
          
      
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  ) 
}


export const Doctor = mongoose.model('Doctor',doctorSchema);
