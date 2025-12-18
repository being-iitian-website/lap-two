import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * GET TOTAL HOURS
 * GET /api/performance/hours/total
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
export declare const getTotalHours: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET HOURS BY SUBJECT
 * GET /api/performance/hours/subject
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
export declare const getHoursBySubject: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET HOURS BY TYPE (Theory vs Solving)
 * GET /api/performance/hours/type
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
export declare const getHoursByType: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=hours.controller.d.ts.map