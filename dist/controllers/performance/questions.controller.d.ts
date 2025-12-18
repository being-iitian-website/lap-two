import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * GET TOTAL QUESTIONS
 * GET /api/performance/questions/total
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
export declare const getTotalQuestions: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET QUESTIONS BY SUBJECT
 * GET /api/performance/questions/subject
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
export declare const getQuestionsBySubject: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=questions.controller.d.ts.map