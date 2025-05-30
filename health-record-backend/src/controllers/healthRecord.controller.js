import {asyncHandler} from '../utils/asyncHandler.js';
import { Health } from '../models/medical_record.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponce.js';

// Upload health record
export const uploadHealthRecord = asyncHandler(async (req, res) => {
  const { patient, doctor, facility, diagnosis, prescription } = req.body;

  // Check required fields
  if (!patient || !doctor) {
    throw new ApiError(400, 'Patient and doctor are required');
  }

  const documentLocalPath = req?.files?.document[0]?.path;

  if (!documentLocalPath) {
    throw new ApiError(400, 'Health document is required');
  }

  const uploadedDoc = await uploadOnCloudinary(documentLocalPath);

  if (!uploadedDoc?.url) {
    throw new ApiError(500, 'Failed to upload document');
  }

  const record = await Health.create({
    patient,
    doctor,
    facility,
    diagnosis,
    prescription,
    document: uploadedDoc.url,
  });

  return res.status(201).json(
    new ApiResponse(201, record, "Health record uploaded successfully")
  );
});

export {
    uploadOnCloudinary
}
