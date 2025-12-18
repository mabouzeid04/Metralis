import { describe, expect, it } from "vitest";
import { prisma } from "../utils/testDb";
import { createAgent } from "../utils/testServer";
import { getUserToken } from "../utils/auth";

const agent = createAgent();

const getMachineId = async () => {
  const machine = await prisma.machine.findFirstOrThrow();
  return machine.id;
};

describe("workOrders routes", () => {
  it("rejects unauthenticated requests", async () => {
    const response = await agent.get("/api/v1/work-orders");
    expect(response.status).toBe(401);
  });

  it("creates and retrieves a work order", async () => {
    const token = await getUserToken("TECHNICIAN");
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

    expect(createResponse.status).toBe(201);
    const workOrderId = createResponse.body.data.id as string;

    const listResponse = await agent.get("/api/v1/work-orders").set("Authorization", `Bearer ${token}`);
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data.some((wo: any) => wo.id === workOrderId)).toBe(true);

    const detailResponse = await agent
      .get(`/api/v1/work-orders/${workOrderId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(detailResponse.status).toBe(200);
    expect(detailResponse.body.data.id).toBe(workOrderId);
  });

  it("validates work order payloads", async () => {
    const token = await getUserToken("TECHNICIAN");
    const response = await agent
      .post("/api/v1/work-orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "", descriptionRaw: "" });

    expect(response.status).toBe(400);
  });
});
