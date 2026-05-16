
import { Router } from "express";
import multer from 'multer';
import {
  getFacilityProfile,
  createUpdateFacilityProfile,
  addDoctorToFacility,
  removeDoctorFromFacility,
  getFacilityStats,
  getAllFacilityDoctors
} from "../controllers/facility.controller.js";

import { UserverifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();


router.get('/profile',UserverifyJWT ,authorizeRoles('facility'), getFacilityProfile);
router.post('/profile', UserverifyJWT, authorizeRoles('facility'), upload.single('logo'), createUpdateFacilityProfile);
router.post('/doctors', UserverifyJWT, authorizeRoles('facility'), addDoctorToFacility);
router.delete('/doctors/:doctorId', UserverifyJWT, authorizeRoles('facility'), removeDoctorFromFacility);
router.get('/stats', UserverifyJWT, authorizeRoles('facility'), getFacilityStats);
router.get('/doctors', UserverifyJWT, authorizeRoles('facility'), getAllFacilityDoctors);


export default router;