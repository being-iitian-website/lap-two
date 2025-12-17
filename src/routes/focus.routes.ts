import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  saveFocusSession,
  getRecentFocusSessions,
} from "../controllers/Focus_session/focus.controller";

const router = Router();

// All focus routes require authentication
router.use(authMiddleware);

// Save a focus session
router.post("/", saveFocusSession);

// Get recent focus sessions
router.get("/recent", getRecentFocusSessions);

export default router;


