import { createApp } from "./app";
import { env } from "./config/env";
import { execSync } from "child_process";

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

async function startServer() {
  // Only run migrations in production (when DATABASE_URL is set to Supabase)
  if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL?.includes("supabase")) {
    await runMigrations();
  }

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`API listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});


