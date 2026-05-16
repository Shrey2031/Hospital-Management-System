import express from "express";
import  {authorizeRoles}  from '../middleware/role.middleware.js';
import {
  createPrescription,
  getMyPrescriptions,
  getPatientPrescriptions,
  getPrescriptionStats,
  requestRefill,
  downloadPrescription
} from "../controllers/prescription.controller.js";
import { UserverifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Doctor creates prescription
router.post('/', UserverifyJWT, authorizeRoles('doctor'),
 upload.single('scannedFile'), createPrescription);
// router.get('/my', UserverifyJWT, getMyPrescriptions);

// Patient gets THEIR prescriptions (for frontend page)
router.get('/patient/prescriptions', UserverifyJWT, authorizeRoles('patient'), getPatientPrescriptions);

// Get stats
router.get('/patient/stats', UserverifyJWT, authorizeRoles('patient'), getPrescriptionStats);

// Refill request
router.post('/patient/refill', UserverifyJWT, authorizeRoles('patient'), requestRefill);

// Download PDF
router.get('/patient/:id/download', UserverifyJWT, authorizeRoles('patient'), downloadPrescription);

// OLD: Get all my prescriptions (works for both)
router.get('/my', UserverifyJWT, getMyPrescriptions);

export default router;