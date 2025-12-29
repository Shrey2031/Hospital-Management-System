import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/apiResponce.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import { use } from "react";


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
const registerUser = asyncHandler(async (req,resp) => {

    const {fullname,username,email,password,age,gender,address,phone,bloodGroup} = req.body;
    console.log("email: ",email);
    
 //    console.log(req.file);
 
    if(
        [username,email,password].some((field) => field?.trim() === "" )
 
    ){
              throw new ApiError (400,"all fields are mandatory")
    }
 
    const existedUser = await User.findOne({
      $or: [{ username: username }, { email: email }] 
     })
 
     if(existedUser){
         throw new  ApiError(409, "user with email and password already exist")
     }

     const documentLocalPath = req.files?.document[0]?.path;
    if(!documentLocalPath){

        throw new  ApiError(400, "documentlocalpath  file is required ")
    }

    const document = await uploadOnCloudinary(documentLocalPath);
    // if(!document){
    //     throw new  ApiError(400, "document file is required ");

    // }
      const user = await User.create({
         fullname,
         username,
         email: email,
         password,
         age,
         gender,
         bloodGroup,
         address,
         phone,
         document:document.url || "",
         
     })
 
     const createdUser = await  User.findById(user._id).select(
         "-password -refreshToken"
     )
 
     if(!createdUser){
         throw new ApiError(500, "user not found")
     }
 
     return resp.status(201).json(
         new ApiResponse(200,createdUser,"user register successfully")
     )
 
 
 
 })

 const loginUser = asyncHandler(async(req,resp) => {
    // req.body -> data
    //username or  email
    // find the user
    // password check
    // access and refresh token
    // send cookie
    const {email,username,password} = req.body;
    console.log(email);
    if(!username && !email){
     throw new ApiError(400,'username or email is required')
    }
 
    const user = await User.findOne({
     $or:[{username},{email}]
    })
 
    if(!user){
     throw new ApiError(404,'user does not exist')
    }
 
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
     throw new ApiError(401,'invalid password')
    }
 
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);
 
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
 
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
 const logoutUser = ( async (req,resp) => {
    await  User.findByIdAndUpdate(
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
    .json(new ApiResponse(200,{},"user logged Out"))

})



// Get a specific user by ID
const getUserDetails = asyncHandler(async (req, res) => {

  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});






 export {
    registerUser,
    generateAccessAndRefreshToken,
    loginUser,
    logoutUser,
    getUserDetails,

 }

