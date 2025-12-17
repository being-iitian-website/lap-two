import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  createRevision,
  getRevisionsByDate,
  getRevisionAnalytics,
  getRevisionHistory,
  updateRevisionStatus,
} from "../controllers/revision.controller";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create a manual revision
router.post("/", createRevision);

// Get revisions by date (calendar view)
router.get("/", getRevisionsByDate);

// Get revision analytics (count by subject and unit)
router.get("/analytics/count", getRevisionAnalytics);

// Get revision history (7 days, 30 days, or all time)
router.get("/history", getRevisionHistory);

// Update revision status
router.patch("/:id/status", updateRevisionStatus);

export default router;

