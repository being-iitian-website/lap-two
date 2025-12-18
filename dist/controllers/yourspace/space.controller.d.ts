import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * CREATE / UPDATE JOURNAL (Upsert-style)
 * POST /api/journal
 */
export declare const saveJournal: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET MY JOURNALS
 * GET /api/journal/me
 */
export declare const getMyJournals: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET TODAY'S RESPONSES
 * GET /api/space/today-responses
 *
 * Fetch all today's targets that contain daily question responses
 */
export declare const getTodayResponses: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=space.controller.d.ts.map