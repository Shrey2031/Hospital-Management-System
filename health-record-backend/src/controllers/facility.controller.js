import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponce.js";
import {Facility} from '../models/Facility.models.js';

const generateAccessAndRefreshToken = async(userId) =>{
    try {
       const user = await Facility.findById(userId)
       const accessToken = user.generateAccessToken()
       const refreshToken = user.generateRefreshToken()

       user.refreshToken = refreshToken;
      await  user.save({validateBeforeSave: false})

       return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,'something went wrong while generating refresh and access token')
    }
}
const registerFacility = asyncHandler(async (req,resp) => {
    
    const {fullname,email,password,address,city,specialisedIn,phone} = req.body;
    console.log("email: ",email);
 //    console.log(req.file);
 
    if(
        [fullname,email,password].some((field) => field?.trim() === "" )
 
    ){
              throw new ApiError (400,"all fields are mandatory")
    }
 
    const existedUser = await Facility.findOne({
      $or: [{ name: fullname }, { email: email }] 
     })
 
     if(existedUser){
         throw new  ApiError(409, "user with email and password already exist")
     }

     
      const user = await Facility.create({
         fullname,
         email,
         password,
         address,
         specialisedIn,
         phone,
         city,
         
     })
 
     const createdUser = await  Facility.findById(user._id).select(
         "-password -refreshToken"
     )
 
     if(!createdUser){
         throw new ApiError(500, "user not found")
     }
 
     return resp.status(201).json(
         new ApiResponse(200,createdUser,"facility register successfully")
     )
 
 
 
 })

  const loginFacility = asyncHandler(async(req,resp) => {
    // req.body -> data
    //username or  email
    // find the user
    // password check
    // access and refresh token
    // send cookie
 
 
    const {email,password} = req.body;
    
    if(!password && !email){
     throw new ApiError(400,'username or email is required')
    }
 
  
    const user = await Facility.findOne({ email }).select("+password");
       if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
      }
 
    if(!user){
     throw new ApiError(404,'user does not exist')
    }
 
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
     throw new ApiError(401,'invalid password')
    }
 
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);
 
    const loggedInUser = await Facility.findById(user._id).select("-password -refreshToken");
 
    const options = {
     httpOnly: true,
     secure: true
 
    }
 
    return resp.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse(
         200,
         {
             user:loggedInUser,accessToken,refreshToken
         },
         "user login Successfully"
      )
    )
    
 })

 const logoutFacility = ( async (req,resp) => {
     await  Facility.findByIdAndUpdate(
         req.user._id,
         {
             $unset:{
                 refreshToken: 1
             }
         },
         {
             new:true
         }
     )
 
     const options = {
         httpOnly: true,
         secure: true
     
        }
 
    return resp.status(200)
     .clearCookie("accessToken",options)
     .clearCookie("refreshToken",options)
     .json(new ApiResponse(200,{},"user  logged Out"))
 
 })

 const getAllFacility = asyncHandler(async (req, res) => {
   const doctors = await Facility.find().select("-password");
 
   res.status(200).json({
     success: true,
     count: Facility.length,
     doctors,
   });
 
    
 });

 const getFacility = asyncHandler(async (req, res) => {

  const facilityId = req.user?._id;
  const facility = await Facility.findById(facilityId).select("-password");
  res.status(200).json({
    success: true,
    facility,
  });
});

 export {
    registerFacility,
    generateAccessAndRefreshToken,
    loginFacility,
    logoutFacility,
    getAllFacility,
    getFacility
 }