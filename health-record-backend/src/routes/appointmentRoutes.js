import { Router } from "express";
import { UserverifyJWT, DoctorverifyJWT, FacilityverifyJWT } from "../middlware/auth.middleware.js";
import { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment,getAppointment } from "../controllers/appointment.controller.js";
const router = Router();


router.route('/appointment/:id').put(UserverifyJWT,updateAppointmentStatus);
router.route('/appointment/:id').delete(UserverifyJWT,deleteAppointment);
router.route('/appointment/create').post(UserverifyJWT,postAppointment);
router.route('/appoinment/').get(DoctorverifyJWT,getAllAppointments);
router.route('/appoinment/user').get(UserverifyJWT,getAppointment);








export default router;