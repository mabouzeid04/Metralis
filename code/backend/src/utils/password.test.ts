import { describe, expect, it } from "vitest";
import { comparePassword, hashPassword } from "./password";

describe("password utils", () => {
  it("hashes and verifies a password", async () => {
    const hash = await hashPassword("Secret123!");

    expect(hash).not.toBe("Secret123!");
    expect(await comparePassword("Secret123!", hash)).toBe(true);
  });

  it("returns false for mismatched password", async () => {
    const hash = await hashPassword("AnotherPass!");

    expect(await comparePassword("WrongPass!", hash)).toBe(false);
  });
});


