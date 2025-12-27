import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { getHistoryByDate } from "../controllers/dashboard/history.controller";
import {
  getDailyXPAwardsByDate,
  getTotalXP,
} from "../controllers/dashboard/xpaward.controller";
import {
  getTodayEfficiency,
  getWeekEfficiency,
  getEfficiencyHistory,
  recalculateEfficiency,
} from "../controllers/dashboard/efficiency.controller";

const router = Router();

// All dashboard routes require authentication
router.use(authMiddleware);

// Get history by date
router.get("/history", getHistoryByDate);

// Get daily XP awards by date
router.get("/xp/daily", getDailyXPAwardsByDate);

// Get total XP for user
router.get("/xp/total", getTotalXP);

// Efficiency tracking routes
router.get("/efficiency/today", getTodayEfficiency);
router.get("/efficiency/week", getWeekEfficiency);
router.get("/efficiency/history", getEfficiencyHistory);
router.post("/efficiency/recalculate", recalculateEfficiency);

export default router;

