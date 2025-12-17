import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  createTarget,
  getTodayTargets,
  updateTargetStatus,
  carryForwardTarget,
  deleteTarget,
} from "../controllers/target.controllers";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create a new target
router.post("/", createTarget);

// Get today's targets
router.get("/today", getTodayTargets);

// Update target status
router.patch("/:id/status", updateTargetStatus);

// Carry forward a missed target
router.post("/:id/carry-forward", carryForwardTarget);

// Delete a target
router.delete("/:id", deleteTarget);

export default router;
