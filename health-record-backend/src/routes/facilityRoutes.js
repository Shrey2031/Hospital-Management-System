import { Router } from "express";
import { FacilityverifyJWT } from '../middlware/auth.middleware.js';
import { loginFacility, logoutFacility, registerFacility , getAllFacility, getFacility} from "../controllers/facility.controller.js";
const router = Router();


router.route('/register/facility').post(registerFacility);
router.route('/login/facility').post(loginFacility);

router.route('/logout/facility').post(FacilityverifyJWT,logoutFacility);
router.route('/facility/').get(FacilityverifyJWT,getAllFacility);
router.route('/facility/me').get(FacilityverifyJWT,getFacility);

export default router;
