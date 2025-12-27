const { Client } = require('pg');

const connectionString = "postgresql://postgres.vodpkueuivafcfjmtexa:Orion1FoodBasket2@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require";

async function run() {
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    console.log('Applying missing columns to User table...');
    await client.query(`
      ALTER TABLE "User" 
      ADD COLUMN IF NOT EXISTS "approvedAt" TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "approvedById" TEXT,
      ADD COLUMN IF NOT EXISTS "rejectedAt" TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "rejectionReason" TEXT,
      ADD COLUMN IF NOT EXISTS "status" "UserStatus" NOT NULL DEFAULT 'APPROVED'
    `);

    console.log('Creating IncidentChunk table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "IncidentChunk" (
          "id" TEXT NOT NULL,
          "workOrderId" TEXT NOT NULL,
          "chunkIndex" INTEGER NOT NULL,
          "content" TEXT NOT NULL,
          "tokens" INTEGER NOT NULL,
          "embedding" vector(1536) NOT NULL,
          "machineId" TEXT,
          "machineType" TEXT,
          "language" TEXT DEFAULT 'en',
          "metadata" JSONB,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "IncidentChunk_pkey" PRIMARY KEY ("id")
      )
    `);

    console.log('Creating SystemInsight table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "SystemInsight" (
          "id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "content" TEXT NOT NULL,
          "category" "InsightCategory" NOT NULL,
          "priority" "InsightPriority" NOT NULL,
          "status" "InsightStatus" NOT NULL DEFAULT 'NEW',
          "metadata" JSONB,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,

          CONSTRAINT "SystemInsight_pkey" PRIMARY KEY ("id")
      )
    `);

    console.log('Creating indexes and foreign keys...');
    await client.query('CREATE INDEX IF NOT EXISTS "IncidentChunk_workOrderId_idx" ON "IncidentChunk"("workOrderId")');
    await client.query('CREATE INDEX IF NOT EXISTS "IncidentChunk_machineId_idx" ON "IncidentChunk"("machineId")');
    await client.query('CREATE INDEX IF NOT EXISTS "IncidentChunk_machineType_idx" ON "IncidentChunk"("machineType")');
    await client.query('CREATE UNIQUE INDEX IF NOT EXISTS "IncidentChunk_workOrderId_chunkIndex_key" ON "IncidentChunk"("workOrderId", "chunkIndex")');
    await client.query('CREATE INDEX IF NOT EXISTS "SystemInsight_status_idx" ON "SystemInsight"("status")');
    await client.query('CREATE INDEX IF NOT EXISTS "SystemInsight_priority_idx" ON "SystemInsight"("priority")');
    await client.query('CREATE INDEX IF NOT EXISTS "SystemInsight_category_idx" ON "SystemInsight"("category")');
    await client.query('CREATE INDEX IF NOT EXISTS "SystemInsight_createdAt_idx" ON "SystemInsight"("createdAt")');
    
    // Foreign keys
    try { await client.query('ALTER TABLE "User" ADD CONSTRAINT "User_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE'); } catch(e) {}
    try { await client.query('ALTER TABLE "IncidentChunk" ADD CONSTRAINT "IncidentChunk_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE'); } catch(e) {}

    console.log('Successfully applied all missing production schema elements.');

  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

run();
