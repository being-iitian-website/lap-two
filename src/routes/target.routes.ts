import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  createTarget,
  getTodayTargets,
  updateTargetStatus,
} from "../controllers/targets/targets.controllers";
import {
  carryForwardTarget,
  deleteTarget,
  submitDailyResponse,
} from "../controllers/targets/targetresponses.controller";
import { createChallengeTarget } from "../controllers/targets/challenge.controller";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create a new target
router.post("/", createTarget);

// Create daily challenge target
router.post("/challenge", createChallengeTarget);

// Get today's targets
router.get("/today", getTodayTargets);

// Update target status
router.patch("/:id/status", updateTargetStatus);

// Carry forward a missed target
router.post("/:id/carry-forward", carryForwardTarget);

// Submit daily response for a target
router.post("/:targetId/daily-response", submitDailyResponse);

// Delete a target
router.delete("/:id", deleteTarget);

export default router;
