"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const child_process_1 = require("child_process");
const node_cron_1 = __importDefault(require("node-cron"));
const insightService_1 = require("./services/insightService");
// Run migrations before starting the server (for production deployments)
async function runMigrations() {
    try {
        console.log("Running database migrations...");
        (0, child_process_1.execSync)("npx prisma migrate deploy", { stdio: "inherit" });
        console.log("✅ Migrations completed successfully");
    }
    catch (error) {
        console.error("❌ Migration failed:", error);
        // In production, you might want to exit here, but for MVP we'll continue
        // to allow the app to start even if migrations fail (they might already be applied)
        console.log("⚠️  Continuing startup despite migration error...");
    }
}
// Schedule daily insight generation at 2:00 AM
function setupCronJobs() {
    node_cron_1.default.schedule("0 2 * * *", async () => {
        console.log("[Cron] Running daily insight generation at 2:00 AM...");
        try {
            const count = await (0, insightService_1.generateSystemInsights)();
            console.log(`[Cron] Generated ${count} insights`);
        }
        catch (error) {
            console.error("[Cron] Error generating insights:", error);
        }
    });
    console.log("✅ Cron jobs scheduled (insight generation at 2:00 AM daily)");
}
async function startServer() {
    // Only run migrations in production (when DATABASE_URL is set to Supabase)
    if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL?.includes("supabase")) {
        await runMigrations();
    }
    const app = (0, app_1.createApp)();
    app.listen(env_1.env.port, '0.0.0.0', () => {
        console.log(`API listening on port ${env_1.env.port}`);
        setupCronJobs();
    });
}
startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map