import { describe, expect, it } from "vitest";
import { signToken, verifyToken } from "./jwt";

const basePayload = {
  sub: "user-123",
  email: "tester@example.com",
  name: "Tester",
  role: "ADMIN" as const,
  status: "APPROVED" as const,
};

describe("jwt utils", () => {
  it("signs and verifies tokens", () => {
    const token = signToken(basePayload);
    expect(typeof token).toBe("string");

    const decoded = verifyToken(token);
    expect(decoded.sub).toBe(basePayload.sub);
    expect(decoded.email).toBe(basePayload.email);
    expect(decoded.role).toBe("ADMIN");
  });

  it("throws for invalid tokens", () => {
    expect(() => verifyToken("bad-token")).toThrow();
  });
});


