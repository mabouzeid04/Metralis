import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { requireAuth, requireRole } from "./auth";
import { signToken } from "../utils/jwt";

const createMockRes = () => {
  const res: Partial<Response> & { statusCode?: number; body?: unknown } = {};

  res.status = vi.fn((code: number) => {
    res.statusCode = code;
    return res as Response;
  });

  res.json = vi.fn((payload: unknown) => {
    res.body = payload;
    return res as Response;
  });

  return res as Response & { statusCode?: number; body?: unknown };
};

const createNext = () => vi.fn(() => undefined) as NextFunction;

describe("requireAuth", () => {
  it("rejects when authorization header is missing", () => {
    const req = { headers: {} } as unknown as Request;
    const res = createMockRes();
    const next = createNext();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.body).toEqual({ error: { message: "Unauthorized" } });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects when token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalid-token" } } as unknown as Request;
    const res = createMockRes();
    const next = createNext();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.body).toEqual({ error: { message: "Invalid token" } });
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches user and calls next when token is valid", () => {
    const token = signToken({
      sub: "user-123",
      email: "tester@example.com",
      name: "Tester",
      role: "ADMIN",
      status: "APPROVED",
    });

    const req = {
      headers: { authorization: `Bearer ${token}` },
    } as unknown as Request;
    const res = createMockRes();
    const next = createNext();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toMatchObject({
      id: "user-123",
      email: "tester@example.com",
      role: "ADMIN",
    });
  });
});

describe("requireRole", () => {
  it("returns 403 when user is missing", () => {
    const req = { user: undefined } as unknown as Request;
    const res = createMockRes();
    const next = createNext();

    requireRole(["ADMIN"])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.body).toEqual({ error: { message: "Forbidden" } });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 403 when user role is not allowed", () => {
    const req = {
      user: { id: "user-123", email: "user@test.com", name: "User", role: "TECHNICIAN", status: "APPROVED" },
    } as unknown as Request;
    const res = createMockRes();
    const next = createNext();

    requireRole(["ADMIN"])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.body).toEqual({ error: { message: "Forbidden" } });
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when user has allowed role", () => {
    const req = {
      user: { id: "user-123", email: "user@test.com", name: "User", role: "ADMIN", status: "APPROVED" },
    } as unknown as Request;
    const res = createMockRes();
    const next = createNext();

    requireRole(["ADMIN"])(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});




