import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { saveJournal, getMyJournals, getTodayResponses } from "../controllers/yourspace/space.controller";
import { saveVisionBoard, getVisionBoard } from "../controllers/yourspace/visionboard";

const router = Router();

// All journal routes require authentication
router.use(authMiddleware);

// Create or update a journal (upsert style)
router.post("/", saveJournal);

// Get current user's journals
router.get("/me", getMyJournals);

// Get today's responses
router.get("/today-responses", getTodayResponses);

// Vision Board routes
// Save or update vision board
router.post("/vision-board/save", saveVisionBoard);

// Get vision board
router.get("/vision-board", getVisionBoard);

export default router;

