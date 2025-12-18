import type { Request, Response } from "express";
interface RegisterBody {
    name?: string;
    email?: string;
    password?: string;
}
interface LoginBody {
    email?: string;
    password?: string;
}
/**
 * REGISTER
 */
export declare const register: (req: Request<unknown, unknown, RegisterBody>, res: Response) => Promise<Response | void>;
/**
 * LOGIN
 */
export declare const login: (req: Request<unknown, unknown, LoginBody>, res: Response) => Promise<Response | void>;
/**
 * LOGOUT
 *
 * For stateless JWT auth, logout is handled on the client
 * by removing the stored token. This endpoint exists mainly
 * for frontend/Postman flows and future extensibility (e.g. blacklist).
 */
export declare const logout: (_req: Request, res: Response) => Promise<Response | void>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map