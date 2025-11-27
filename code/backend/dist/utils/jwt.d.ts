import type { UserRole } from "../generated/prisma/client";
interface TokenPayload {
    sub: string;
    email: string;
    role: UserRole;
    name: string;
}
export declare const signToken: (payload: TokenPayload) => string;
export declare const verifyToken: (token: string) => TokenPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map