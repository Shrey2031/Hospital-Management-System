import { Router } from "express";

import express from "express";

import {
   uploadMedicalRecord,
   getMyRecords,
   shareRecord,
   deleteRecord,
   getRecordsStats
    
 } from "../controllers/healthRecord.controller.js";
import { UserverifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {upload} from '../middleware/multer.middleware.js'
import { singleUpload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post('/upload', UserverifyJWT, authorizeRoles('patient'), singleUpload, uploadMedicalRecord);
router.get('/my', UserverifyJWT, getMyRecords);
router.post('/share', UserverifyJWT, shareRecord);
router.delete('/:recordId', UserverifyJWT, deleteRecord);
router.get('/stats', UserverifyJWT, getRecordsStats);
export default router;
