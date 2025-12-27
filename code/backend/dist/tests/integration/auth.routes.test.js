"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const testServer_1 = require("../utils/testServer");
const auth_1 = require("../utils/auth");
const agent = (0, testServer_1.createAgent)();
(0, vitest_1.describe)("auth routes", () => {
    (0, vitest_1.it)("logs in with valid credentials", async () => {
        const response = await agent.post("/api/v1/auth/login").send({
            email: "admin@test.com",
            password: "Admin123!",
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.token).toBeTruthy();
        (0, vitest_1.expect)(response.body.data.user.email).toBe("admin@test.com");
    });
    (0, vitest_1.it)("rejects invalid credentials", async () => {
        const response = await agent.post("/api/v1/auth/login").send({
            email: "admin@test.com",
            password: "wrong-password",
        });
        (0, vitest_1.expect)(response.status).toBe(401);
        (0, vitest_1.expect)(response.body.error.message).toBe("Invalid credentials");
    });
    (0, vitest_1.it)("returns the current user via /me", async () => {
        const token = await (0, auth_1.getUserToken)("ADMIN");
        const response = await agent.get("/api/v1/auth/me").set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.email).toBe("admin@test.com");
    });
    (0, vitest_1.it)("creates a pending technician on signup when users exist", async () => {
        const response = await agent.post("/api/v1/auth/signup").send({
            name: "New User",
            email: "newuser@test.com",
            password: "StrongPass1!",
        });
        (0, vitest_1.expect)(response.status).toBe(201);
        (0, vitest_1.expect)(response.body.data.user.role).toBe("TECHNICIAN");
        (0, vitest_1.expect)(response.body.data.user.status).toBe("PENDING");
        (0, vitest_1.expect)(response.body.data.token).toBeNull();
    });
});
//# sourceMappingURL=auth.routes.test.js.map