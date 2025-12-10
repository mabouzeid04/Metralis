import type { UserRole } from "../../src/generated/prisma/client";
import { signToken } from "../../src/utils/jwt";
import { prisma } from "./testDb";

export const getUserToken = async (role: UserRole = "TECHNICIAN") => {
  const user = await prisma.user.findFirstOrThrow({
    where: { role },
  });

  return signToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  });
};
