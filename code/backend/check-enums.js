const { Client } = require('pg');

const connectionString = "postgresql://postgres.vodpkueuivafcfjmtexa:Orion1FoodBasket2@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require";

async function run() {
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    const enums = ['UserStatus', 'AiFeedbackValue', 'InsightCategory', 'InsightPriority', 'InsightStatus'];
    for (const enm of enums) {
        const res = await client.query(`SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${enm}')`);
        console.log(`Enum ${enm} exists: ${res.rows[0].exists}`);
    }

  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

run();
