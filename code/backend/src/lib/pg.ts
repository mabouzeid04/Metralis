import { Pool } from "pg";
import { env } from "../config/env";

const shouldUseSSL = (() => {
  const flag = (process.env.DATABASE_SSL || "").toLowerCase();
  if (flag === "true" || flag === "1") {
    return true;
  }
  if (flag === "false" || flag === "0") {
    return false;
  }

  try {
    const url = new URL(env.databaseUrl);
    const sslMode = (url.searchParams.get("sslmode") || url.searchParams.get("ssl"))?.toLowerCase();
    if (sslMode && ["require", "prefer", "verify-full", "verify-ca"].includes(sslMode)) {
      return true;
    }
    const hostname = url.hostname.toLowerCase();
    return hostname.includes("supabase") || hostname.includes("render.com") || hostname.includes("neon.tech");
  } catch (_error) {
    return false;
  }
})();

export const pgPool = new Pool({
  connectionString: env.databaseUrl,
  max: 5,
  ssl: shouldUseSSL ? { rejectUnauthorized: false } : undefined,
});

