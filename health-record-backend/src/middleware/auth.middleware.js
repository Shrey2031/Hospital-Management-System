// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/apiError.js";
// import { User } from "../models/users.models.js";
// import JWT from 'jsonwebtoken';

// export const UserverifyJWT = asyncHandler(async(req,resp,next) => {
//     try {
     
//     const token =  req.cookies?.accessToken || req.header
//     ("authorization")?.replace("Bearer ","");
 
//     if(!token){
//         throw new ApiError(401,"unauthorized request")
//     }
 
//     const decodedToken = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
 
//     const user = await User.findById(decodedToken?._id).select("-password, -refreshToken");
 
//     if(!user){
//         throw new ApiError(401,"invalid  Access Token")
//     }
 
//     req.user = user;
//     next();
//     } catch (error) {
//        throw new ApiError(401,error?.message || "invalid accessToken")
//     }
//  })

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/users.models.js";
import JWT from 'jsonwebtoken';

export const UserverifyJWT = asyncHandler(async (req, resp, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "unauthorized request");
        }

        const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Was "-password, -refreshToken" (comma) — Mongoose .select() splits
        // on WHITESPACE, not commas, so "-password," (with the comma still
        // attached) never matched the real `password` field. The hashed
        // password was being attached to req.user on every authenticated
        // request. Fixed to a space-separated string.
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        // Previously re-wrapped EVERY error (including ones already thrown
        // above as ApiError) into a fresh generic ApiError(401, ...). Today
        // that's harmless since everything in this file uses 401, but it's
        // fragile against future changes. Pass through existing ApiError
        // instances as-is; only wrap genuinely unexpected errors (e.g. a
        // raw JsonWebTokenError from jwt.verify).
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(401, error?.message || "invalid accessToken");
    }
});