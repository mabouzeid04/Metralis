import { createApp } from "./app";
import { env } from "./config/env";
import { execSync } from "child_process";
import cron from "node-cron";
import { generateSystemInsights } from "./services/insightService";

// Run migrations before starting the server (for production deployments)
async function runMigrations() {
  try {
    console.log("Running database migrations...");
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
    console.log("✅ Migrations completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    // In production, you might want to exit here, but for MVP we'll continue
    // to allow the app to start even if migrations fail (they might already be applied)
    console.log("⚠️  Continuing startup despite migration error...");
  }
}

// Schedule daily insight generation at 2:00 AM
function setupCronJobs() {
  cron.schedule("0 2 * * *", async () => {
    console.log("[Cron] Running daily insight generation at 2:00 AM...");
    try {
      const count = await generateSystemInsights();
      console.log(`[Cron] Generated ${count} insights`);
    } catch (error) {
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

  const app = createApp();
  app.listen(env.port, '0.0.0.0', () => {
    console.log(`API listening on port ${env.port}`);
    setupCronJobs();
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
