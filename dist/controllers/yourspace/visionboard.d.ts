import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
/**
 * SAVE / UPDATE VISION BOARD
 * POST /api/vision-board/save
 *
 * Business Rules:
 * - Each user can have only one active vision board
 * - Save action overwrites existing board
 * - Empty cells are not stored
 * - Only logged-in user can save their board
 */
export declare const saveVisionBoard: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
/**
 * GET VISION BOARD
 * GET /api/vision-board
 *
 * Returns the vision board for the logged-in user
 */
export declare const getVisionBoard: (req: AuthenticatedRequest, res: Response) => Promise<Response | void>;
//# sourceMappingURL=visionboard.d.ts.map