import { describe, expect, it } from "vitest";
import { createAgent } from "../utils/testServer";
import { getUserToken } from "../utils/auth";

const agent = createAgent();

describe("documents routes", () => {
  it("requires authentication", async () => {
    const response = await agent.get("/api/v1/documents");
    expect(response.status).toBe(401);
  });

  it("creates and retrieves a document", async () => {
    const token = await getUserToken("ADMIN");

    const uploadResponse = await agent
      .post("/api/v1/documents")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from("Document content"), "manual.txt")
      .field("title", "Test Manual")
      .field("language", "en");

    expect(uploadResponse.status).toBe(201);
    const documentId = uploadResponse.body.data.id as string;

    const listResponse = await agent.get("/api/v1/documents").set("Authorization", `Bearer ${token}`);
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data.some((doc: any) => doc.id === documentId)).toBe(true);

    const detailResponse = await agent
      .get(`/api/v1/documents/${documentId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(detailResponse.status).toBe(200);
    expect(detailResponse.body.data.id).toBe(documentId);
  });
});
