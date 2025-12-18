import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
export declare const updateMissedRevisions: (userId: string) => Promise<void>;
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
 * UPDATE REVISION STATUS
 * PATCH /api/revisions/:id/status
 */
export declare const updateRevisionStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=revision.controller.d.ts.map