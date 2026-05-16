import mongoose , {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username:{
      type:String,
      required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "facility"],
      required: true,
    },
    blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
    messagingSettings: {
    muteNotifications: { type: Boolean, default: false },
    messageSound: { type: Boolean, default: true },
    typingIndicators: { type: Boolean, default: true }
  },
  avatar: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=Patient&background=skyblue&color=fff'
  },
    lastLogin: Date,
    lastSeen: { type: Date },
     isActive: { type: Boolean, default: true },
      isVerified: { type: Boolean, default: false },
    refreshToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save",async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10)
  next();
  
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
 return jwt.sign(
      {
          _id:this._id,
          role:this.role,
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
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id:this._id,
          role:this.role,
      
          
      
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  ) 
}

export const User = mongoose.model('User',userSchema);
