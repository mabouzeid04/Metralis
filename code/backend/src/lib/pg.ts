import { Pool } from "pg";
import { env } from "../config/env";

// Explicitly disable TLS verification to tolerate Supabase’s self-signed chain
// in this environment. This is scoped to the backend process only.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const pgPool = new Pool({
  connectionString: env.databaseUrl,
  max: 5,
  ssl: { rejectUnauthorized: false },
});

