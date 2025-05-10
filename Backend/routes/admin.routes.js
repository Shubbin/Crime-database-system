import express from "express";
import {
  createAdmin,
  deleteUser,
  assignBadgeNumber,
} from "../controllers/admin.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { updateRole } from "../controllers/updateRole.controller.js";

const router = express.Router();

router.put("/update-role", authenticateUser, isAdmin, updateRole);
router.post("/create-admin", authenticateUser, isAdmin, createAdmin);
router.delete("/delete-user/:userId", authenticateUser, isAdmin, deleteUser);
router.post("/assign-badge", authenticateUser, isAdmin, assignBadgeNumber);

export default router;
