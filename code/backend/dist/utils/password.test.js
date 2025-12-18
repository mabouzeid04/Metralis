"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const password_1 = require("./password");
(0, vitest_1.describe)("password utils", () => {
    (0, vitest_1.it)("hashes and verifies a password", async () => {
        const hash = await (0, password_1.hashPassword)("Secret123!");
        (0, vitest_1.expect)(hash).not.toBe("Secret123!");
        (0, vitest_1.expect)(await (0, password_1.comparePassword)("Secret123!", hash)).toBe(true);
    });
    (0, vitest_1.it)("returns false for mismatched password", async () => {
        const hash = await (0, password_1.hashPassword)("AnotherPass!");
        (0, vitest_1.expect)(await (0, password_1.comparePassword)("WrongPass!", hash)).toBe(false);
    });
});
//# sourceMappingURL=password.test.js.map