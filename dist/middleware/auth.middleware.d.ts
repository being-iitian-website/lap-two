import type { NextFunction, Request, Response } from "express";
import type { JwtUserPayload } from "../utils/jwt";
export interface AuthenticatedRequest extends Request {
    user?: JwtUserPayload;
}
export declare const authMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response | void;
//# sourceMappingURL=auth.middleware.d.ts.map