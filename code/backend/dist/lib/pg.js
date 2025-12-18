"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgPool = void 0;
const pg_1 = require("pg");
const env_1 = require("../config/env");
// Explicitly disable TLS verification to tolerate Supabase’s self-signed chain
// in this environment. This is scoped to the backend process only.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
exports.pgPool = new pg_1.Pool({
    connectionString: env_1.env.databaseUrl,
    max: 5,
    ssl: { rejectUnauthorized: false },
});
//# sourceMappingURL=pg.js.map