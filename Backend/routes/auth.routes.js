import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/signup", signup);
router.post("/api/login", login);
router.post("/api/logout", logout);
router.get("/api/verify-email/:token", verifyEmail);
router.post("/api/forgot-password", forgotPassword);

export default router;
