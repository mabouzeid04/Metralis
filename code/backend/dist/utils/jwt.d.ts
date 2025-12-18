import type { UserRole, UserStatus } from "../generated/prisma/client";
interface TokenPayload {
    sub: string;
    email: string;
    role: UserRole;
    name: string;
    status: UserStatus;
}
export declare const signToken: (payload: TokenPayload) => string;
export declare const verifyToken: (token: string) => TokenPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map