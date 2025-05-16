import express from 'express';
import {
  getCriminals,
  addCriminal,
  updateCriminal,
  deleteCriminal
} from '../controllers/criminal.controller.js';
import { authenticateUser } from '../middleware/authenticateUser.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', authenticateUser, getCriminals);
router.post('/add', authenticateUser, addCriminal);
router.put('/update/:criminalId', authenticateUser, updateCriminal);
router.delete('/delete/:criminalId', authenticateUser, isAdmin, deleteCriminal);

export default router;
