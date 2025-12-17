import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  createRevision,
  getRevisionsByDate,
  updateRevisionStatus,
} from "../controllers/revision/revision.controller";
import { getRevisionAnalytics } from "../controllers/revision/revisionanalysis.controller";
import { getRevisionHistory } from "../controllers/revision/recentrevision.controller";

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

