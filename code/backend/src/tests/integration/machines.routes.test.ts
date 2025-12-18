import { describe, expect, it } from "vitest";
import { prisma } from "../utils/testDb";
import { createAgent } from "../utils/testServer";
import { getUserToken } from "../utils/auth";

const agent = createAgent();

describe("machines routes", () => {
  it("requires authentication", async () => {
    const response = await agent.get("/api/v1/machines");
    expect(response.status).toBe(401);
  });

  it("lists machines for authenticated user", async () => {
    const token = await getUserToken("TECHNICIAN");
    const response = await agent.get("/api/v1/machines").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("forbids creation for non-admins", async () => {
    const token = await getUserToken("TECHNICIAN");
    const response = await agent
      .post("/api/v1/machines")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Tech Created Machine" });

    expect(response.status).toBe(403);
  });

  it("allows admins to create and update machines", async () => {
    const adminToken = await getUserToken("ADMIN");

    const createResponse = await agent
      .post("/api/v1/machines")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Integration Machine", code: "M-100" });

    expect(createResponse.status).toBe(201);
    const machineId = createResponse.body.data.id as string;
    expect(machineId).toBeTruthy();

    const patchResponse = await agent
      .patch(`/api/v1/machines/${machineId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "DOWN" });

    expect(patchResponse.status).toBe(200);
    expect(patchResponse.body.data.status).toBe("DOWN");
  });

  it("returns 404 when updating missing machine", async () => {
    const adminToken = await getUserToken("ADMIN");
    const response = await agent
      .patch("/api/v1/machines/non-existent")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "DOWN" });

    expect(response.status).toBe(404);
  });

  it("deletes a machine as admin", async () => {
    const adminToken = await getUserToken("ADMIN");
    const machine = await prisma.machine.create({
      data: { name: "Temp Machine", status: "RUNNING", criticality: "LOW" },
    });

    const response = await agent
      .delete(`/api/v1/machines/${machine.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(204);
  });
});
