"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const testDb_1 = require("../utils/testDb");
const testServer_1 = require("../utils/testServer");
const auth_1 = require("../utils/auth");
const agent = (0, testServer_1.createAgent)();
(0, vitest_1.describe)("machines routes", () => {
    (0, vitest_1.it)("requires authentication", async () => {
        const response = await agent.get("/api/v1/machines");
        (0, vitest_1.expect)(response.status).toBe(401);
    });
    (0, vitest_1.it)("lists machines for authenticated user", async () => {
        const token = await (0, auth_1.getUserToken)("TECHNICIAN");
        const response = await agent.get("/api/v1/machines").set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.data.length).toBeGreaterThan(0);
    });
    (0, vitest_1.it)("forbids creation for non-admins", async () => {
        const token = await (0, auth_1.getUserToken)("TECHNICIAN");
        const response = await agent
            .post("/api/v1/machines")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "Tech Created Machine" });
        (0, vitest_1.expect)(response.status).toBe(403);
    });
    (0, vitest_1.it)("allows admins to create and update machines", async () => {
        const adminToken = await (0, auth_1.getUserToken)("ADMIN");
        const createResponse = await agent
            .post("/api/v1/machines")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Integration Machine", code: "M-100" });
        (0, vitest_1.expect)(createResponse.status).toBe(201);
        const machineId = createResponse.body.data.id;
        (0, vitest_1.expect)(machineId).toBeTruthy();
        const patchResponse = await agent
            .patch(`/api/v1/machines/${machineId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ status: "DOWN" });
        (0, vitest_1.expect)(patchResponse.status).toBe(200);
        (0, vitest_1.expect)(patchResponse.body.data.status).toBe("DOWN");
    });
    (0, vitest_1.it)("returns 404 when updating missing machine", async () => {
        const adminToken = await (0, auth_1.getUserToken)("ADMIN");
        const response = await agent
            .patch("/api/v1/machines/non-existent")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ status: "DOWN" });
        (0, vitest_1.expect)(response.status).toBe(404);
    });
    (0, vitest_1.it)("deletes a machine as admin", async () => {
        const adminToken = await (0, auth_1.getUserToken)("ADMIN");
        const machine = await testDb_1.prisma.machine.create({
            data: { name: "Temp Machine", status: "RUNNING", criticality: "LOW" },
        });
        const response = await agent
            .delete(`/api/v1/machines/${machine.id}`)
            .set("Authorization", `Bearer ${adminToken}`);
        (0, vitest_1.expect)(response.status).toBe(204);
    });
});
//# sourceMappingURL=machines.routes.test.js.map