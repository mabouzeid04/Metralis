"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const testDb_1 = require("../utils/testDb");
const testServer_1 = require("../utils/testServer");
const auth_1 = require("../utils/auth");
const agent = (0, testServer_1.createAgent)();
const getMachineId = async () => {
    const machine = await testDb_1.prisma.machine.findFirstOrThrow();
    return machine.id;
};
(0, vitest_1.describe)("workOrders routes", () => {
    (0, vitest_1.it)("rejects unauthenticated requests", async () => {
        const response = await agent.get("/api/v1/work-orders");
        (0, vitest_1.expect)(response.status).toBe(401);
    });
    (0, vitest_1.it)("creates and retrieves a work order", async () => {
        const token = await (0, auth_1.getUserToken)("TECHNICIAN");
        const machineId = await getMachineId();
        const createResponse = await agent
            .post("/api/v1/work-orders")
            .set("Authorization", `Bearer ${token}`)
            .send({
            machineId,
            title: "Replace belt",
            descriptionRaw: "Belt is worn out",
            type: "CORRECTIVE",
            priority: "HIGH",
        });
        (0, vitest_1.expect)(createResponse.status).toBe(201);
        const workOrderId = createResponse.body.data.id;
        const listResponse = await agent.get("/api/v1/work-orders").set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(listResponse.status).toBe(200);
        (0, vitest_1.expect)(listResponse.body.data.some((wo) => wo.id === workOrderId)).toBe(true);
        const detailResponse = await agent
            .get(`/api/v1/work-orders/${workOrderId}`)
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(detailResponse.status).toBe(200);
        (0, vitest_1.expect)(detailResponse.body.data.id).toBe(workOrderId);
    });
    (0, vitest_1.it)("validates work order payloads", async () => {
        const token = await (0, auth_1.getUserToken)("TECHNICIAN");
        const response = await agent
            .post("/api/v1/work-orders")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "", descriptionRaw: "" });
        (0, vitest_1.expect)(response.status).toBe(400);
    });
});
//# sourceMappingURL=workOrders.routes.test.js.map