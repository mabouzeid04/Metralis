import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { errorHandler } from "./errorHandler";

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

describe("errorHandler", () => {
  it("returns error message for Error instances", () => {
    const res = createMockRes();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    errorHandler(new Error("boom"), {} as Request, res, vi.fn());

    expect(consoleSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.body).toEqual({ error: { message: "boom" } });

    consoleSpy.mockRestore();
  });

  it("returns generic message for non-Error values", () => {
    const res = createMockRes();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    errorHandler("string-error", {} as Request, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.body).toEqual({ error: { message: "Internal Server Error" } });

    consoleSpy.mockRestore();
  });
});
