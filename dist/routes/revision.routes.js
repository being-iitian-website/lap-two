"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const revision_controller_1 = require("../controllers/revision.controller");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Create a manual revision
router.post("/", revision_controller_1.createRevision);
// Get revisions by date (calendar view)
router.get("/", revision_controller_1.getRevisionsByDate);
// Get revision analytics (count by subject and unit)
router.get("/analytics/count", revision_controller_1.getRevisionAnalytics);
// Get revision history (7 days, 30 days, or all time)
router.get("/history", revision_controller_1.getRevisionHistory);
// Update revision status
router.patch("/:id/status", revision_controller_1.updateRevisionStatus);
exports.default = router;
//# sourceMappingURL=revision.routes.js.map