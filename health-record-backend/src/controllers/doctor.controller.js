import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponce.js";
import {Doctor} from '../models/doctor.models.js';

const generateAccessAndRefreshToken = async(userId) =>{
    try {
       const user = await User.findById(userId)
       const accessToken = user.generateAccessToken()
       const refreshToken = user.generateRefreshToken()

       user.refreshToken = refreshToken;
      await  user.save({validateBeforeSave: false})

       return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,'something went wrong while generating refresh and access token')
    }
}
const registerDoctor = asyncHandler(async (req,resp) => {
    // get user details from frontend
    //validation - not empty
    // check if user already exists: username, email
    
    
    // create user object - create entry in db
    // remove password and refresh token field from response
    //check for user creation
    // return res
 
    const {name,email,password,specialization,experienceInyears} = req.body
    console.log("email: ",email);
 //    console.log(req.file);
 
    if(
        [name,email,password].some((field) => field?.trim() === "" )
 
    ){
              throw new ApiError (400,"all fields are mandatory")
    }
 
    const existedUser = await Doctor.findOne({
      $or: [{ name: name }, { email: email }] 
     })
 
     if(existedUser){
         throw new  ApiError(409, "user with email and password already exist")
     }

     
      const user = await Doctor.create({
         name: name,
         email,
         password,
         experienceInyears,
         specialization,
         
     })
 
     const createdUser = await  Doctor.findById(user._id).select(
         "-password -refreshToken"
     )
 
     if(!createdUser){
         throw new ApiError(500, "user not found")
     }
 
     return resp.status(201).json(
         new ApiResponse(200,createdUser,"user register successfully")
     )
 
 
 
 })

 export {
    registerDoctor,
    generateAccessAndRefreshToken,
 }