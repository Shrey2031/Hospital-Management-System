// import { Router } from "express";
// import {upload} from '../middlware/multer.middleware.js';
// import {UserverifyJWT} from '../middlware/auth.middleware.js'; 
// import { generateAccessAndRefreshToken, getUserDetails, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js"

// import { createHealthRecord } from "../controllers/healthRecord.controller.js";

// const router = Router();
// // router.route('/upload').post(upload.fields(
// //     [
// //         { name:"document",
// //             maxCount:1
// //         }
// //     ]),createHealthRecord);

// router.route('/register/user').post(upload.fields(
//     [
//         { name:"document",
//             maxCount:1
//         }
//     ]),registerUser);
// // router.route('/register/user').post(registerUser);
 
    


// router.route('/refresh-token').post(generateAccessAndRefreshToken);
// router.route('/login/user').post(loginUser);


// router.route('/user').get(UserverifyJWT,getUserDetails);

// router.route('/logout/user').post(UserverifyJWT,logoutUser);


// export default router;


import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getPatientStats,
  fixBrokenAppointments,
  generateAccessAndRefreshToken,
  getPatientDoctors
} from "../controllers/user.controller.js";
import { UserverifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.get("/doctors", UserverifyJWT, getPatientDoctors); // 👈 NEW ROUTE
router.post("/login", loginUser);

router.post("/logout", UserverifyJWT, logoutUser);
router.get('/patient/stats', UserverifyJWT, getPatientStats);
router.get("/me", UserverifyJWT, getUserDetails);
router.post("/refresh-token", generateAccessAndRefreshToken);
// routes/appointments.js
router.post('/fix-broken', UserverifyJWT, fixBrokenAppointments);

export default router;