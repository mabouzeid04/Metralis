import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { UserRole, UserStatus } from "../generated/prisma/client";

interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
  status: UserStatus;
}

export const signToken = (payload: TokenPayload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, env.jwtSecret) as TokenPayload;


