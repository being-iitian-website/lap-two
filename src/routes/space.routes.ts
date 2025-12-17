import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { saveJournal, getMyJournals, getTodayResponses } from "../controllers/yourspace/space.controller";

const router = Router();

// All journal routes require authentication
router.use(authMiddleware);

// Create or update a journal (upsert style)
router.post("/", saveJournal);

// Get current user's journals
router.get("/me", getMyJournals);

// Get today's responses
router.get("/today-responses", getTodayResponses);

export default router;

