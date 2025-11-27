import type { UserRole, UserStatus } from "../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        email: string;
        name: string;
        status: UserStatus;
      };
    }
  }
}

export {};


