"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const jwt_1 = require("./jwt");
const basePayload = {
    sub: "user-123",
    email: "tester@example.com",
    name: "Tester",
    role: "ADMIN",
    status: "APPROVED",
};
(0, vitest_1.describe)("jwt utils", () => {
    (0, vitest_1.it)("signs and verifies tokens", () => {
        const token = (0, jwt_1.signToken)(basePayload);
        (0, vitest_1.expect)(typeof token).toBe("string");
        const decoded = (0, jwt_1.verifyToken)(token);
        (0, vitest_1.expect)(decoded.sub).toBe(basePayload.sub);
        (0, vitest_1.expect)(decoded.email).toBe(basePayload.email);
        (0, vitest_1.expect)(decoded.role).toBe("ADMIN");
    });
    (0, vitest_1.it)("throws for invalid tokens", () => {
        (0, vitest_1.expect)(() => (0, jwt_1.verifyToken)("bad-token")).toThrow();
    });
});
//# sourceMappingURL=jwt.test.js.map