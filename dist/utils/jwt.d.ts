export interface JwtUserPayload {
    id: string | number;
    email: string;
    role?: string;
}
export declare const generateToken: (user: JwtUserPayload) => string;
//# sourceMappingURL=jwt.d.ts.map