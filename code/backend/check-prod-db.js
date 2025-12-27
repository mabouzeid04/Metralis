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
    
    const tables = ['SystemInsight', 'IncidentChunk', 'ChatMessageFeedback'];
    for (const table of tables) {
        const res = await client.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${table}')`);
        console.log(`Table ${table} exists: ${res.rows[0].exists}`);
    }

    const columns = [
        ['User', 'status'],
        ['ChatMessage', 'structuredOutput'],
        ['RepairAction', 'rootCause']
    ];
    for (const [table, column] of columns) {
        const res = await client.query(`SELECT EXISTS (SELECT FROM information_schema.columns WHERE table_name = '${table}' AND column_name = '${column}')`);
        console.log(`Column ${table}.${column} exists: ${res.rows[0].exists}`);
    }

  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

run();
