import { Router } from "express";

import express from "express";

import {
   uploadMedicalRecord,
   getMyRecords,
   shareRecord,
   deleteRecord,
   getRecordsStats,
   getRecordsForDoctor,
   getRecordDetails
    
 } from "../controllers/healthRecord.controller.js";
import { UserverifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {upload} from '../middleware/multer.middleware.js'
import { singleUpload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post('/upload', UserverifyJWT, authorizeRoles('patient'), singleUpload, uploadMedicalRecord);
router.get('/my', UserverifyJWT,authorizeRoles('patient'), getMyRecords);
router.post('/share', UserverifyJWT,authorizeRoles('patient'), shareRecord);
router.delete('/:recordId', UserverifyJWT,authorizeRoles('patient'), deleteRecord);
router.get('/stats', UserverifyJWT, authorizeRoles('patient'), getRecordsStats);
// routes/medicalRecordRoutes.js - ADD THESE

router.get('/doctor/records', UserverifyJWT, authorizeRoles('doctor'), getRecordsForDoctor);
router.get('/doctor/records/:recordId', UserverifyJWT, authorizeRoles('doctor'), getRecordDetails);
export default router;
