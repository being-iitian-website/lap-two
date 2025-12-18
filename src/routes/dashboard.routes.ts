import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { getHistoryByDate } from "../controllers/dashboard/history.controller";

const router = Router();

// All dashboard routes require authentication
router.use(authMiddleware);

// Get history by date
router.get("/history", getHistoryByDate);

export default router;

