import { describe, expect, it } from "vitest";
import { createAgent } from "../utils/testServer";
import { getUserToken } from "../utils/auth";

const agent = createAgent();

describe("auth routes", () => {
  it("logs in with valid credentials", async () => {
    const response = await agent.post("/api/v1/auth/login").send({
      email: "admin@test.com",
      password: "Admin123!",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeTruthy();
    expect(response.body.data.user.email).toBe("admin@test.com");
  });

  it("rejects invalid credentials", async () => {
    const response = await agent.post("/api/v1/auth/login").send({
      email: "admin@test.com",
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Invalid credentials");
  });

  it("returns the current user via /me", async () => {
    const token = await getUserToken("ADMIN");

    const response = await agent.get("/api/v1/auth/me").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe("admin@test.com");
  });

  it("creates a pending technician on signup when users exist", async () => {
    const response = await agent.post("/api/v1/auth/signup").send({
      name: "New User",
      email: "newuser@test.com",
      password: "StrongPass1!",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.user.role).toBe("TECHNICIAN");
    expect(response.body.data.user.status).toBe("PENDING");
    expect(response.body.data.token).toBeNull();
  });
});
