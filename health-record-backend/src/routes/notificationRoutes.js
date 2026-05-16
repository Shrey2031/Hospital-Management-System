


import { Router } from "express";

import express from "express";

import {
   getNotifications,
   markAsRead,
    markAllAsRead
    
 } from "../controllers/notification.controller.js";
import { UserverifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get('/', UserverifyJWT, getNotifications);
router.patch('/:notificationId/read', UserverifyJWT, markAsRead);
router.patch('/read-all', UserverifyJWT, markAllAsRead);

export default router;