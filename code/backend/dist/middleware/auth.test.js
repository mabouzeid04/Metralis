"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_1 = require("./auth");
const jwt_1 = require("../utils/jwt");
const createMockRes = () => {
    const res = {};
    res.status = vitest_1.vi.fn((code) => {
        res.statusCode = code;
        return res;
    });
    res.json = vitest_1.vi.fn((payload) => {
        res.body = payload;
        return res;
    });
    return res;
};
const createNext = () => vitest_1.vi.fn(() => undefined);
(0, vitest_1.describe)("requireAuth", () => {
    (0, vitest_1.it)("rejects when authorization header is missing", () => {
        const req = { headers: {} };
        const res = createMockRes();
        const next = createNext();
        (0, auth_1.requireAuth)(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(401);
        (0, vitest_1.expect)(res.body).toEqual({ error: { message: "Unauthorized" } });
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("rejects when token is invalid", () => {
        const req = { headers: { authorization: "Bearer invalid-token" } };
        const res = createMockRes();
        const next = createNext();
        (0, auth_1.requireAuth)(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(401);
        (0, vitest_1.expect)(res.body).toEqual({ error: { message: "Invalid token" } });
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("attaches user and calls next when token is valid", () => {
        const token = (0, jwt_1.signToken)({
            sub: "user-123",
            email: "tester@example.com",
            name: "Tester",
            role: "ADMIN",
            status: "APPROVED",
        });
        const req = {
            headers: { authorization: `Bearer ${token}` },
        };
        const res = createMockRes();
        const next = createNext();
        (0, auth_1.requireAuth)(req, res, next);
        (0, vitest_1.expect)(next).toHaveBeenCalled();
        (0, vitest_1.expect)(req.user).toMatchObject({
            id: "user-123",
            email: "tester@example.com",
            role: "ADMIN",
        });
    });
});
(0, vitest_1.describe)("requireRole", () => {
    (0, vitest_1.it)("returns 403 when user is missing", () => {
        const req = { user: undefined };
        const res = createMockRes();
        const next = createNext();
        (0, auth_1.requireRole)(["ADMIN"])(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(403);
        (0, vitest_1.expect)(res.body).toEqual({ error: { message: "Forbidden" } });
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("returns 403 when user role is not allowed", () => {
        const req = {
            user: { id: "user-123", email: "user@test.com", name: "User", role: "TECHNICIAN", status: "APPROVED" },
        };
        const res = createMockRes();
        const next = createNext();
        (0, auth_1.requireRole)(["ADMIN"])(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(403);
        (0, vitest_1.expect)(res.body).toEqual({ error: { message: "Forbidden" } });
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("calls next when user has allowed role", () => {
        const req = {
            user: { id: "user-123", email: "user@test.com", name: "User", role: "ADMIN", status: "APPROVED" },
        };
        const res = createMockRes();
        const next = createNext();
        (0, auth_1.requireRole)(["ADMIN"])(req, res, next);
        (0, vitest_1.expect)(res.status).not.toHaveBeenCalled();
        (0, vitest_1.expect)(next).toHaveBeenCalled();
    });
});
//# sourceMappingURL=auth.test.js.map