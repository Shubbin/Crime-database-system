// routes/authRoutes.js
import express from 'express';
import {
  signup, login, logout, verifyEmail,
  forgotPassword, resetPassword, verifyResetToken
} from "../controllers/auth.controller.js"

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.get('/verify-reset-token/:token', verifyResetToken);
router.post('/reset-password/:token', resetPassword);
router.post('/logout', logout);

export default router;
