"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const testServer_1 = require("../utils/testServer");
const auth_1 = require("../utils/auth");
const agent = (0, testServer_1.createAgent)();
(0, vitest_1.describe)("documents routes", () => {
    (0, vitest_1.it)("requires authentication", async () => {
        const response = await agent.get("/api/v1/documents");
        (0, vitest_1.expect)(response.status).toBe(401);
    });
    (0, vitest_1.it)("creates and retrieves a document", async () => {
        const token = await (0, auth_1.getUserToken)("ADMIN");
        const uploadResponse = await agent
            .post("/api/v1/documents")
            .set("Authorization", `Bearer ${token}`)
            .attach("file", Buffer.from("Document content"), "manual.txt")
            .field("title", "Test Manual")
            .field("language", "en");
        (0, vitest_1.expect)(uploadResponse.status).toBe(201);
        const documentId = uploadResponse.body.data.id;
        const listResponse = await agent.get("/api/v1/documents").set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(listResponse.status).toBe(200);
        (0, vitest_1.expect)(listResponse.body.data.some((doc) => doc.id === documentId)).toBe(true);
        const detailResponse = await agent
            .get(`/api/v1/documents/${documentId}`)
            .set("Authorization", `Bearer ${token}`);
        (0, vitest_1.expect)(detailResponse.status).toBe(200);
        (0, vitest_1.expect)(detailResponse.body.data.id).toBe(documentId);
    });
});
//# sourceMappingURL=documents.routes.test.js.map