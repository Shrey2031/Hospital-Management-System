import { Router } from "express";
import {upload} from '../middlware/multer.middleware.js';
import {verifyJWT} from '../middlware/auth.middleware.js';
import { generateAccessAndRefreshToken, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { registerDoctor } from "../controllers/doctor.controller.js";
import { registerFacility } from "../controllers/facility.controller.js";
import { uploadHealthRecord } from "../controllers/healthRecord.controller.js";

const router = Router();
router.route('/upload').post(upload.fields(
    [
        { name:"document",
            maxCount:1,
        }
    ]),uploadHealthRecord);
router.route('/refresh-token').post(generateAccessAndRefreshToken);
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser);

router.route('/register/user').post(registerUser);
router.route('/register/doctor').post(registerDoctor);
router.route('/register/facility').post(registerFacility);





export default router;


