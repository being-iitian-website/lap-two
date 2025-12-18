import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * GET REVISION HISTORY
 * GET /api/revisions/history?range=7|30|all
 * Default range: 7 days
 */
export declare const getRevisionHistory: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=recentrevision.controller.d.ts.map