import { Router } from "express";
import {upload} from '../middlware/multer.middleware.js';
import {DoctorverifyJWT} from '../middlware/auth.middleware.js';
import { getAllDoctors, loginDoctor, registerDoctor,logoutDoctor,getDoctorDetails } from "../controllers/doctor.controller.js"

const router = Router();


router.route('/register/doctor').post(upload.fields(
     [
        { name:"avatar",
            maxCount:1
        }
    ]),registerDoctor);

router.route('/login/doctor').post(loginDoctor);
router.route('/doctor/').get(DoctorverifyJWT,getDoctorDetails);

router.route('/doctor').get(DoctorverifyJWT,getAllDoctors);
router.route('/logout/doctor').post(DoctorverifyJWT,logoutDoctor);





export default router;
