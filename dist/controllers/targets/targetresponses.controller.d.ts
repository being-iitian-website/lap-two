import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * CARRY FORWARD MISSED TARGET
 * POST /api/targets/:id/carry-forward
 */
export declare const carryForwardTarget: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * DELETE TARGET
 * DELETE /api/targets/:id
 */
export declare const deleteTarget: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * SUBMIT DAILY RESPONSE
 * POST /api/targets/:targetId/daily-response
 *
 * Submit daily question responses for a target
 * Validation:
 * - Target must belong to logged-in user
 * - responseDate must be today
 * - Responses cannot be overwritten
 */
export declare const submitDailyResponse: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=targetresponses.controller.d.ts.map