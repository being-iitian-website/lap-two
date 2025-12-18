import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * GET REVISION ANALYTICS (Count by Subject and Unit)
 * GET /api/revisions/analytics/count
 */
export declare const getRevisionAnalytics: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=revisionanalysis.controller.d.ts.map