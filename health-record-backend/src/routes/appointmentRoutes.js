import { Router } from "express";

import express from "express";

import {
    createAppointment,
    getMyAppointments,
    getAvailableSlots,
    cancelAppointment,
    getAppointmentStats,
    getNextAppointment
    
 } from "../controllers/appointment.controller.js";
import { UserverifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post('/', UserverifyJWT, authorizeRoles('patient'), createAppointment);
router.get('/my', UserverifyJWT, getMyAppointments);
router.delete('/:appointmentId/cancel', UserverifyJWT, cancelAppointment);
router.get('/slots', UserverifyJWT, getAvailableSlots);
router.get('/stats', UserverifyJWT, getAppointmentStats);
router.get('/next', UserverifyJWT, getNextAppointment);

export default router;