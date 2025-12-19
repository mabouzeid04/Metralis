const { Client } = require('pg');

const connectionString = "postgresql://postgres.vodpkueuivafcfjmtexa:Orion1FoodBasket2@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require";

async function run() {
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to database');
    
    await client.query('CREATE EXTENSION IF NOT EXISTS vector');
    
    await client.query('DROP TYPE IF EXISTS "UserStatus" CASCADE');
    await client.query('DROP TYPE IF EXISTS "AiFeedbackValue" CASCADE');
    await client.query('DROP TYPE IF EXISTS "InsightCategory" CASCADE');
    await client.query('DROP TYPE IF EXISTS "InsightPriority" CASCADE');
    await client.query('DROP TYPE IF EXISTS "InsightStatus" CASCADE');
    console.log('Dropped enum types');

    // Create a dummy index so the DROP INDEX command in the migration succeeds
    // We need to make sure the table exists first.
    await client.query('CREATE TABLE IF NOT EXISTS "DocumentChunk" (id TEXT PRIMARY KEY)');
    await client.query('ALTER TABLE "DocumentChunk" ADD COLUMN IF NOT EXISTS "embedding" vector(1536)');
    await client.query('CREATE INDEX IF NOT EXISTS "DocumentChunk_embedding_ivfflat_idx" ON "DocumentChunk"("embedding")');
    console.log('Ensured dummy index exists for dropping');


  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

run();
