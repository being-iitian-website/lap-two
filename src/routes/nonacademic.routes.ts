import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  trackSleep,
  trackActivity,
  trackWaterIntake,
} from "../controllers/nonacademic/nonacademic.controller";

const router = Router();

// All wellness routes require authentication
router.use(authMiddleware);

// Sleep tracking
router.post("/wellness/sleep", trackSleep);

// Exercise & Meditation tracking
router.post("/wellness/activity", trackActivity);

// Water intake tracking
router.post("/wellness/water", trackWaterIntake);

export default router;

