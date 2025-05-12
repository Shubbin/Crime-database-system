import express from 'express';
import { addCriminal, updateCriminal, getCriminals } from '../controllers/criminal.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { isPoliceOrAdmin } from '../middleware/isPoliceOrAdmin.js';

const router = express.Router();

router.post('/add', authenticateUser, isPoliceOrAdmin, addCriminal);
router.put('/update/:criminalId', authenticateUser, isPoliceOrAdmin, updateCriminal);
router.get('/view', authenticateUser, isPoliceOrAdmin, getCriminals); // optional protection

export default router;
