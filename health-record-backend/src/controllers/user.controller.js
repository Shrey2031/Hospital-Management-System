import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/apiResponce.js";
import { Appointment } from "../models/appointment.models.js";
import {Prescription}  from "../models/prescription.model.js";
import { PatientProfile } from "../models/patientProfile.model.js";
import { DoctorProfile } from "../models/doctorProfile.model.js";
import { MedicalRecord } from "../models/medicalRecord.model.js";
import mongoose from "mongoose";



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

    const {fullname,username,email,password,phone,role} = req.body;
 
    if(
        [fullname,username,email,password].some((field) => field?.trim() === "" )
 
    ){
              throw new ApiError (400,"all fields are mandatory")
    }
 
    const existedUser = await User.findOne({
      $or: [{ username: username }, { email: email }]
     })
 
     if(existedUser){
         throw new  ApiError(409, "user with email and password already exist")
     }

    //  const documentLocalPath = req.files?.document[0]?.path;
    // if(!documentLocalPath){

    //     throw new  ApiError(400, "documentlocalpath  file is required ")
    // }

      const user = await User.create({
         fullname,
         username,
         email: email,
         password,
         phone,
         role,
      
         
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
    
    const {email,password} = req.body;
    // console.log(email);
    if(!email || !password){
     throw new ApiError(400,'email and password are required')
    }
 
    const user = await User.findOne({
    //  $or:[{email}]
       email
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


const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(
    new ApiResponse(200, user, "User details fetched successfully")
  );
})
// const getPatientStats = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   // Count appointments (upcoming + recent)
//   const appointmentsCount = await Appointment.countDocuments({
//     patientId: userId,
//     status: { $in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
//   });

//   // Count medical records/prescriptions
//   const prescriptionsCount = await Prescription.countDocuments({
//     patientId: userId
//   });

//   // Count unique doctors
//   const doctorsCount = await Appointment.distinct('doctorId', {
//     patientId: userId
//   }).then(doctors => doctors.length);

//   // Average rating (if you have reviews)
//   const avgRating = await Appointment.aggregate([
//     { $match: { patientId: userId } },
//     {
//       $group: {
//         _id: null,
//         avgRating: { $avg: '$rating' }
//       }
//     }
//   ]).then(result => result[0]?.avgRating || 0);

//   // Recent visits (last 30 days)
//   const recentVisits = await Appointment.countDocuments({
//     patientId: userId,
//     date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
//   });

//   const stats = {
//     appointmentsCount,
//     recordsCount: prescriptionsCount,
//     prescriptionsCount,
//     doctorsCount,
//     rating: Math.round(avgRating * 10) / 10,
//     visitsCount: recentVisits
//   };

//   return res.status(200).json(
//     new ApiResponse(200, stats, "Patient stats fetched successfully")
//   );
// });

const getPatientStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // ✅ FIX 1: Count ACTUAL Records (not prescriptions)
  const recordsCount = await MedicalRecord.countDocuments({     // ← Add MedicalRecord model import
    patientId: userId
  });

  // Count appointments
  const appointmentsCount = await Appointment.countDocuments({
    patientId: userId,
    status: { $in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
  });

  // Count prescriptions
  const prescriptionsCount = await Prescription.countDocuments({
    patientId: userId
  });

  // Count lab reports specifically
  const labReportsCount = await MedicalRecord.countDocuments({
    patientId: userId,
    category: { $in: ['REPORT', 'LAB'] }  // Adjust category names to match your DB
  });

  // Count unique doctors
  const doctorsCount = await Appointment.distinct('doctorId', {
    patientId: userId
  }).then(doctors => doctors.length);

  // Average rating
  const avgRating = await Appointment.aggregate([
    { $match: { patientId: userId } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$rating' }
      }
    }
  ]).then(result => result[0]?.avgRating || 0);

  // Recent visits
  const recentVisits = await Appointment.countDocuments({
    patientId: userId,
    date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  });

  const stats = {
    recordsCount,           // ✅ NOW counts actual Record documents
    labReportsCount,        // ✅ Separate lab count
    appointmentsCount,
    prescriptionsCount,
    doctorsCount,
    rating: Math.round(avgRating * 10) / 10,
    visitsCount: recentVisits
  };

  return res.status(200).json(
    new ApiResponse(200, stats, "Patient stats fetched successfully")
  );
});

// controllers/patientController.js
//  const getPatientDoctors = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search = '', specialty = '' } = req.query;
//         const patientId = req.user.userId; // From your JWT middleware

//         // Find appointments for this patient → get their doctors
//         const appointments = await Appointment.find({
//             patientId: patientId, // Patient's ID
//             $or: [
//                 { 'doctorId.fullName': { $regex: search, $options: 'i' } },
//                 { 'doctorId.specialty': { $regex: search, $options: 'i' } }
//             ]
//         })
//         .populate('doctorId', 'fullName specialty consultationFee rating avatar email')
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .sort({ createdAt: -1 });

//         // Group by doctor (remove duplicates)
//         const uniqueDoctors = appointments.reduce((acc, appointment) => {
//             const doctor = appointment.doctorId;
//             if (!acc.find(d => d._id.toString() === doctor._id.toString())) {
//                 acc.push({
//                     ...doctor.toObject(),
//                     appointmentCount: appointments.filter(a => 
//                         a.doctorId._id.toString() === doctor._id.toString()
//                     ).length,
//                     lastAppointment: appointment.createdAt
//                 });
//             }
//             return acc;
//         }, []);

//         // Filter by specialty if provided
//         const filteredDoctors = specialty 
//             ? uniqueDoctors.filter(doctor => 
//                 doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
//               )
//             : uniqueDoctors;

//         const total = filteredDoctors.length;

//         res.json({
//             success: true,
//             doctors: filteredDoctors,
//             pagination: {
//                 current: page,
//                 pages: Math.ceil(total / limit),
//                 total
//             }
//         });

//     } catch (error) {
//         console.error('Get Patient Doctors Error:', error);
//         res.status(500).json({ error: error.message });
//     }
// };
const getPatientDoctors = async (req, res) => {
    try {
        const patientUserId = req.user.id; // Patient's User ID
        
        // 1. Find patient's appointments using USER ID directly
        const appointments = await Appointment.find({ 
            patientId: patientUserId  // ← Direct User ID!
        })
        .populate({
            path: 'doctorId',
            match: { role: 'doctor' }, // Only doctors
            select: 'fullname specialty consultationFee rating avatar'
        })
        .sort({ createdAt: -1 });

        // 2. Extract unique doctors
        const doctorMap = new Map();
        appointments.forEach(appointment => {
            const doctor = appointment.doctorId;
            if (doctor) {
                const key = doctor._id.toString();
                if (!doctorMap.has(key)) {
                    doctorMap.set(key, {
                        id: doctor._id,
                        fullName: doctor.fullname,
                        specialty: doctor.specialty || 'General',
                        consultationFee: doctor.consultationFee || 100,
                        rating: doctor.rating || 4.5,
                        avatar: doctor.avatar
                    });
                }
            }
        });

        let doctors = Array.from(doctorMap.values());

        // 3. FALLBACK: If no appointments, show top doctors
        if (doctors.length === 0) {
            doctors = await User.find({ 
                role: 'doctor',
                isActive: true 
            })
            .select('fullname specialty consultationFee rating avatar')
            .sort({ rating: -1 })
            .limit(10);
            
            doctors = doctors.map(doctor => ({
                id: doctor._id,
                fullName: doctor.fullname,
                specialty: doctor.specialty || 'General',
                consultationFee: doctor.consultationFee || 100,
                rating: doctor.rating || 4.5,
                avatar: doctor.avatar
            }));
        }

        res.json({
            success: true,
            doctors,
            pagination: {
                current: 1,
                pages: 1,
                total: doctors.length
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 export {
    registerUser,
    generateAccessAndRefreshToken,
    loginUser,
    logoutUser,
    getUserDetails,
    getPatientStats,
    getPatientDoctors

 }

// 🆘 FIX ALL NULL REFERENCES - Run this script ONCE
export const fixBrokenAppointments = async (req, res) => {
  try {
    // Get all doctors
    const doctors = await User.find({ role: 'doctor' }).select('_id fullname specialty');
    
    // Get broken appointments
    const brokenAppts = await Appointment.find({ 
      $or: [{ doctorId: null }, { patientId: null }] 
    });
    
    let fixedCount = 0;
    
    for (let appt of brokenAppts) {
      // Assign first available doctor
      const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
      
      await Appointment.findByIdAndUpdate(appt._id, {
        doctorId: randomDoctor._id,
        patientId: req.user._id || '69e860850f38a28117d5e0e6' // Default patient
      });
      
      fixedCount++;
      console.log(`✅ Fixed ${appt._id} → Dr. ${randomDoctor.fullname}`);
    }
    
    res.json({ 
      success: true, 
      fixed: fixedCount,
      message: `${fixedCount} appointments fixed!`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};