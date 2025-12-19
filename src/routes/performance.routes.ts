import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  getTotalQuestions,
  getQuestionsBySubject,
} from "../controllers/performance/questions.controller";
import {
  getTotalHours,
  getHoursBySubject,
  getHoursByType,
} from "../controllers/performance/hours.controller";
import {
  getSleepRoutine,
  getHealthRoutine,
} from "../controllers/performance/routine.controller";
const router = Router();

// All performance routes require authentication
router.use(authMiddleware);

// Questions routes
router.get("/questions/total", getTotalQuestions);
router.get("/questions/subject", getQuestionsBySubject);

router.get("/routine/sleep", getSleepRoutine);
router.get("/routine/health", getHealthRoutine);
// Hours routes
router.get("/hours/total", getTotalHours);
router.get("/hours/subject", getHoursBySubject);
router.get("/hours/type", getHoursByType);

export default router;

