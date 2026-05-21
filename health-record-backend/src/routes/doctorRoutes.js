


import { Router } from "express";
import {
  getPatientRecords,
  getDoctorAppointments,
  getDoctorPatients,
  getDoctorProfile,
  createUpdateDoctorProfile,
  updateAppointmentStatus,
  getAvailableDoctors,
  getDoctorDashboardStats,
  addNewPatient
} from "../controllers/doctor.controller.js";

import { UserverifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Doctor create/update profile

router.get('/doctor-profile', UserverifyJWT, authorizeRoles('doctor'), getDoctorProfile);
router.post('/profile', UserverifyJWT, authorizeRoles('doctor'), createUpdateDoctorProfile);
router.get('/patients', UserverifyJWT, authorizeRoles('doctor'), getDoctorPatients);
router.get('/patients/:patientId/records', UserverifyJWT, authorizeRoles('doctor'), getPatientRecords);
router.get('/appointments', UserverifyJWT, authorizeRoles('doctor'), getDoctorAppointments);
router.patch('/appointments/:appointmentId/status', UserverifyJWT, authorizeRoles('doctor'), updateAppointmentStatus);
// routes/doctor.js (or user.js)
router.get('/get-doctors', UserverifyJWT,  getAvailableDoctors);
// routes/doctor.js OR routes/appointment.js
router.get('/dashboard/stats', UserverifyJWT,authorizeRoles('doctor'), getDoctorDashboardStats);
// routes/doctor.routes.js
router.post('/patients/add', UserverifyJWT,authorizeRoles('doctor'), addNewPatient);
router.get('/patients', UserverifyJWT,authorizeRoles('doctor'), getDoctorPatients);

export default router;