"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const targets_controllers_1 = require("../controllers/targets/targets.controllers");
const targetresponses_controller_1 = require("../controllers/targets/targetresponses.controller");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Create a new target
router.post("/", targets_controllers_1.createTarget);
// Get today's targets
router.get("/today", targets_controllers_1.getTodayTargets);
// Update target status
router.patch("/:id/status", targets_controllers_1.updateTargetStatus);
// Carry forward a missed target
router.post("/:id/carry-forward", targetresponses_controller_1.carryForwardTarget);
// Submit daily response for a target
router.post("/:targetId/daily-response", targetresponses_controller_1.submitDailyResponse);
// Delete a target
router.delete("/:id", targetresponses_controller_1.deleteTarget);
exports.default = router;
//# sourceMappingURL=target.routes.js.map