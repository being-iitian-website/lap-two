import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * SAVE FOCUS SESSION
 * POST /api/focus
 */
export declare const saveFocusSession: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET RECENT FOCUS SESSIONS
 * GET /api/focus/recent?limit=5
 */
export declare const getRecentFocusSessions: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=focus.controller.d.ts.map