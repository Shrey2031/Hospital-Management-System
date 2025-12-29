import { Health } from "../models/medical_record.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 
import {asyncHandler} from "../utils/asyncHandler.js"; 
import {ApiError} from "../utils/apiError.js";
 import {ApiResponse} from "../utils/apiResponce.js";

// CREATE HEALTH RECORD 
const createHealthRecord = asyncHandler(async (req, res) => {
     const { userId,
        doctorId,
        facilityId,
        description,
        recordType, 
        visibility,
        diagnosis,
        prescription,
        visitDate
     } = req.body; 
if (!userId || !doctorId || !diagnosis || !prescription) 
    { throw new ApiError(400, "Missing required fields"); }
// Upload document to Cloudinary
 let documentUrl = ""; 
 const filePath = req.files?.document?.[0]?.path; 
 if (filePath) 
    { const uploaded = await uploadOnCloudinary(filePath); 
    documentUrl = uploaded?.url || ""; } 
    const record = await Health.create({ 
        patient: userId, 
        doctor: doctorId,
         facility: facilityId || null,
         description,
         recordType,
         visibility,
         diagnosis,
         prescription,
         visitDate,
         document: documentUrl }); 
    res.status(201).json( new ApiResponse(201, record, "Health record created successfully") ); });


// GET ALL HEALTH RECORDS FOR A USER 
const getUserHealthRecords = asyncHandler(async (req, res) =>
     { const userId = req.user._id; 
        const records = await Health.find({ patient: userId })
         .populate("doctor", "fullname specialization")
          .populate("facility", "name city");
         res.status(200).json(
             new ApiResponse(200, { records }, "Fetched user health records") );
     });

 // GET ALL RECORDS ADDED BY DOCTOR
const getDoctorRecords = asyncHandler(async (req, res) =>
         { const doctorId = req.user._id;
             const records = await Health.find({ doctor: doctorId })
              .populate("user", "username email") 
              .populate("facility", "name city");
               res.status(200).json(
                 new ApiResponse(200, { records }, "Fetched doctor health records") );
 });

// GET FACILITY RECORDS 
const getFacilityRecords = asyncHandler(async (req, res) => { 
    const facilityId = req.user._id;
     const records = await Health.find({ facility: facilityId })
      .populate("user", "username email") 
      .populate("doctor", "name specialization");
       res.status(200).json(
         new ApiResponse(200, { records }, "Fetched facility health records") );
 });

 const getAllHealthRecords = asyncHandler(async(req, res) => {
  try {
    const records = await Health.find()
      .populate("patient", "name email")
      .populate("doctor", "name")
      .populate("facility", "name");

    res.status(200).json({
      success: true,
      records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all records"
    });
  }
});
export { createHealthRecord,
    getDoctorRecords,
    getUserHealthRecords,
    getFacilityRecords,
    getAllHealthRecords
 }