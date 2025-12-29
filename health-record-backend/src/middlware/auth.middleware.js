import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/users.models.js";
import { Doctor } from "../models/doctor.models.js";
import { Facility } from "../models/Facility.models.js";
import JWT from 'jsonwebtoken';

export const UserverifyJWT = asyncHandler(async(req,resp,next) => {
    try {
     
    const token =  req.cookies?.accessToken || req.header
    ("authorization")?.replace("Bearer ","");
 
    if(!token){
        throw new ApiError(401,"unauthorized request")
    }
 
    const decodedToken = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
 
    const user = await User.findById(decodedToken?._id).select("-password, -refreshToken");
 
    if(!user){
        throw new ApiError(401,"invalid  Access Token")
    }
 
    req.user = user;
    next();
    } catch (error) {
       throw new ApiError(401,error?.message || "invalid accessToken")
    }
 })

 export const DoctorverifyJWT = asyncHandler(async(req,resp,next) => {
    try {
     
    const token =  req.cookies?.accessToken || req.header
    ("authorization")?.replace("Bearer ","");
 
    if(!token){
        throw new ApiError(401,"unauthorized request")
    }
 
 
    const decodedToken = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
 
    const user = await Doctor.findById(decodedToken?._id).select("-password, -refreshToken");
    console.log("Token received:", token);

 
    if(!user){
        throw new ApiError(401,"invalid  Access Token")
    }
 
    req.user = user;
    next();
    } catch (error) {
       throw new ApiError(401,error?.message || "invalid accessToken")
    }
 })

 export const FacilityverifyJWT = asyncHandler(async(req,resp,next) => {


    try {
     
    const token =  req.cookies?.accessToken || req.header
    ("authorization")?.replace("Bearer ","");
 
    if(!token){
        throw new ApiError(401,"unauthorized request")
    }
 
 
    const decodedToken = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
 
    const user = await Facility.findById(decodedToken?._id).select("-password, -refreshToken");
 
    if(!user){
        throw new ApiError(401,"invalid  Access Token")
    }
 
    req.user = user;
    next();
    } catch (error) {
       throw new ApiError(401,error?.message || "invalid accessToken")
    }
 })




// export const verifyJWT = asyncHandler(async (req, res, next) => {
//   // Get token from cookie or Authorization header
//   const token =
//     req.cookies?.accessToken ||
//     req.header("authorization")?.replace("Bearer ", "");

//   if (!token) throw new ApiError(401, "Unauthorized request: No token");

//   // Decode and verify token
//   const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   const { _id, role } = decodedToken;

//   let user;

//   // Dynamically fetch based on role
//   if (role === "User") {
//     user = await User.findById(_id).select("-password -refreshToken");
//   } else if (role === "doctor") {
//     user = await Doctor.findById(_id).select("-password -refreshToken");
//   } else if (role === "facility") {
//     user = await Facility.findById(_id).select("-password -refreshToken");
//   } else {
//     throw new ApiError(403, "Unauthorized role");
//   }

//   if (!user) throw new ApiError(401, "Invalid access token");

//   req.user = user;
//   req.role = role;
//   next();
// });