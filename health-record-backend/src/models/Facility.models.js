import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const facilitySchema = new Schema({
  
    fullname:{
        type:String,
        required:true,
      },
      email:    
       { type: String,
         required: true,
          unique: true
         },
      password: 
      { type: String, 
        required: true 
      },
      address:{
        type:String,
        required:true,
      },
      city:{
        type:String,
        required:true,
      },
      specialisedIn:{
        type:String,
        required:true,
      },

    role:{ 
      type: String, 
      default: 'facility'
     },
     phone:{
      type:Number

     }

},{timestamps:true});

facilitySchema.pre("save",async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10)
  next();
  
})

facilitySchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

facilitySchema.methods.generateAccessToken = function(){
 return jwt.sign(
      {
          _id:this._id,
          email: this.email,
          username: this.username, 
          fullname:this.fullname   
      
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  ) 
}
facilitySchema.methods.generateRefreshToken = function(){
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


export const Facility = mongoose.model("Facility",facilitySchema);