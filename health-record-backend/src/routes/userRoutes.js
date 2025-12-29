import { Router } from "express";
import {upload} from '../middlware/multer.middleware.js';
import {UserverifyJWT} from '../middlware/auth.middleware.js'; 
import { generateAccessAndRefreshToken, getUserDetails, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js"

import { createHealthRecord } from "../controllers/healthRecord.controller.js";

const router = Router();
// router.route('/upload').post(upload.fields(
//     [
//         { name:"document",
//             maxCount:1
//         }
//     ]),createHealthRecord);

router.route('/register/user').post(upload.fields(
    [
        { name:"document",
            maxCount:1
        }
    ]),registerUser);
// router.route('/register/user').post(registerUser);
 
    


router.route('/refresh-token').post(generateAccessAndRefreshToken);
router.route('/login/user').post(loginUser);


router.route('/user').get(UserverifyJWT,getUserDetails);

router.route('/logout/user').post(UserverifyJWT,logoutUser);








export default router;


