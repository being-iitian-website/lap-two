import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * CREATE TARGET
 * POST /api/targets
 */
export declare const createTarget: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET TODAY'S TARGETS
 * GET /api/targets/today
 */
export declare const getTodayTargets: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * UPDATE TARGET STATUS
 * PATCH /api/targets/:id/status
 */
export declare const updateTargetStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=targets.controllers.d.ts.map