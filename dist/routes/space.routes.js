"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const space_controller_1 = require("../controllers/yourspace/space.controller");
const journalCredentials_controller_1 = require("../controllers/yourspace/journalCredentials.controller");
const visionboard_1 = require("../controllers/yourspace/visionboard");
const router = (0, express_1.Router)();
// All journal routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Create or update a journal (upsert style)
router.post("/", space_controller_1.saveJournal);
// Get current user's journals
router.get("/me", space_controller_1.getMyJournals);
// Get today's responses
router.get("/today-responses", space_controller_1.getTodayResponses);
// Journal credentials routes
router.post("/journal/credentials/set", journalCredentials_controller_1.setJournalCredentials);
router.post("/journal/credentials/reset", journalCredentials_controller_1.resetJournalPassword);
// Vision Board routes
// Save or update vision board
router.post("/vision-board/save", visionboard_1.saveVisionBoard);
// Get vision board
router.get("/vision-board", visionboard_1.getVisionBoard);
exports.default = router;
//# sourceMappingURL=space.routes.js.map