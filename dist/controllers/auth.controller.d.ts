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
export {};
//# sourceMappingURL=auth.controller.d.ts.map