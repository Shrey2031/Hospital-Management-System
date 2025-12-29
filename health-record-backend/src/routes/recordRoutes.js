import { Router } from "express";
import {upload} from '../middlware/multer.middleware.js';
import { createHealthRecord, getAllHealthRecords, getDoctorRecords, getFacilityRecords, getUserHealthRecords } from "../controllers/healthRecord.controller.js";
import { FacilityverifyJWT,UserverifyJWT,DoctorverifyJWT } from "../middlware/auth.middleware.js";

const router = Router();


router.route('/health/create').post(upload.fields(
     [
        { name:"document",
            maxCount:1
        }
    ]),createHealthRecord);

router.route('/health/user').get(UserverifyJWT,getUserHealthRecords);
router.route('/health/').get(UserverifyJWT,getAllHealthRecords);

router.route('/health/doctor').get(DoctorverifyJWT,getDoctorRecords);
router.route('/health/facility').get(FacilityverifyJWT,getFacilityRecords);





export default router;