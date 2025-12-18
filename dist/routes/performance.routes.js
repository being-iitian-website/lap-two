"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const questions_controller_1 = require("../controllers/performance/questions.controller");
const hours_controller_1 = require("../controllers/performance/hours.controller");
const router = (0, express_1.Router)();
// All performance routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Questions routes
router.get("/questions/total", questions_controller_1.getTotalQuestions);
router.get("/questions/subject", questions_controller_1.getQuestionsBySubject);
// Hours routes
router.get("/hours/total", hours_controller_1.getTotalHours);
router.get("/hours/subject", hours_controller_1.getHoursBySubject);
router.get("/hours/type", hours_controller_1.getHoursByType);
exports.default = router;
//# sourceMappingURL=performance.routes.js.map