import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponce.js";
import {Doctor} from '../models/doctor.models.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async(userId) =>{
    try {
       const user = await Doctor.findById(userId)
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

    const {fullname,email,password,gender,specialization,experienceInyears, workInHospital} = req.body;
    console.log("email: ",email);

     if(
        [fullname,email,password].some((field) => field?.trim() === "" )
 
    ){
              throw new ApiError (400,"all fields are mandatory")
    }


    const existedUser = await Doctor.findOne({
      $or: [{ fullname: fullname }, { email: email }] 
     })
 
     if(existedUser){
         throw new  ApiError(409, "user with email and password already exist")
     }
 

   const avatarLocalPath = req.files?.avatar[0]?.path;
   if(!avatarLocalPath){

        throw new  ApiError(400, "avtarlocalpath  file is required ")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar){
        throw new  ApiError(400, "avtar file is required ");

    }
    
 const user = await Doctor.create({
         fullname,
         email,
         password,
         gender,
         experienceInyears,
         specialization,
          avatar: avatar.url,
           workInHospital
         
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

 const loginDoctor = asyncHandler(async(req,resp) => {
   
   const {email,password} = req.body;
   
   if(!email && !password){
    throw new ApiError(400,'password or email is required')
   }

     const user = await Doctor.findOne({ email }).select("+password");
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

   const loggedInUser = await Doctor.findById(user._id).select("-password -refreshToken");

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

const logoutDoctor = ( async (req,resp) => {
    await  Doctor.findByIdAndUpdate(
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



// Get all doctors
const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().select("-password");

  res.status(200).json({
    success: true,
    count: doctors.length,
    doctors,
  });

   
});

// Get a specific user by ID
const getDoctorDetails = asyncHandler(async (req, res) => {

  const doctor = req.user;
  res.status(200).json({
    success: true,
    doctor,
  });
});

const refreshAccessToken = asyncHandler(async (req,resp) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorized request")
    }

   try {
    const decodedToken =  jwt.verify(
         incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
 
     )
 
     const user = Doctor.findById(decodedToken?._id);
 
     if(!user){
         throw new ApiError("invalid refreshToken")
     }
 
     if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(401,"Refresh Token is expired or used")
     }
 
     const options ={
         httpOnly: true,
         secure: true
     }
 
    const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    return resp.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
     new ApiResponse(
        200,
        
            {accessToken, refreshToken:newRefreshToken},
            "access Token refreshed"
        
        
     )
   )
   } catch (error) {
      throw new ApiError(401,error?.message || "Invalid refresh Token")
   }



})




 export {
    registerDoctor,
    generateAccessAndRefreshToken,
    loginDoctor,
    logoutDoctor,
    getAllDoctors,
    getDoctorDetails,
    refreshAccessToken,
 }