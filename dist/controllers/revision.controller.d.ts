import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
/**
 * CREATE REVISION (Manual)
 * POST /api/revisions
 */
export declare const createRevision: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET REVISIONS BY DATE (Calendar View)
 * GET /api/revisions?date=2025-01-15
 */
export declare const getRevisionsByDate: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET REVISION ANALYTICS (Count by Subject and Unit)
 * GET /api/revisions/analytics/count
 */
export declare const getRevisionAnalytics: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET REVISION HISTORY
 * GET /api/revisions/history?range=7|30|all
 */
export declare const getRevisionHistory: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=revision.controller.d.ts.map