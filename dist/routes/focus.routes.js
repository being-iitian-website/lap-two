"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const focus_controller_1 = require("../controllers/Focus_session/focus.controller");
const router = (0, express_1.Router)();
// All focus routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Save a focus session
router.post("/", focus_controller_1.saveFocusSession);
// Get recent focus sessions
router.get("/recent", focus_controller_1.getRecentFocusSessions);
exports.default = router;
//# sourceMappingURL=focus.routes.js.map