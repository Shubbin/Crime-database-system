import express from 'express';
import { getUsers } from '../controllers/police.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { isPoliceOrAdmin } from '../middleware/isPoliceOrAdmin.js';

const router = express.Router();

router.get('/users', authenticateUser, isPoliceOrAdmin, getUsers);

export default router;
