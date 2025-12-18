import { afterEach, describe, expect, it, vi } from "vitest";

const createPoolMock = () => {
  const poolSpy = vi.fn();

  vi.doMock("pg", () => ({
    Pool: vi.fn((config) => {
      poolSpy(config);
      return { config };
    }),
  }));

  return poolSpy;
};

const importPgModule = async () => {
  vi.resetModules();
  return import("./pg");
};

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("pg pool configuration", () => {
  it("enables SSL for supabase-like hosts", async () => {
    const poolSpy = createPoolMock();
    process.env.DATABASE_URL = "postgresql://user:pass@db.supabase.co:5432/db";

    await importPgModule();

    expect(poolSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }),
    );
  });

  it("disables SSL when DATABASE_SSL is false", async () => {
    const poolSpy = createPoolMock();
    process.env.DATABASE_URL = "postgresql://user:pass@db.supabase.co:5432/db";
    process.env.DATABASE_SSL = "false";

    await importPgModule();

    expect(poolSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ssl: undefined,
      }),
    );
  });

  it("uses no SSL for local connections by default", async () => {
    const poolSpy = createPoolMock();
    process.env.DATABASE_URL = "postgresql://user:pass@localhost:5432/db";
    delete process.env.DATABASE_SSL;

    await importPgModule();

    expect(poolSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ssl: undefined,
      }),
    );
  });
});
