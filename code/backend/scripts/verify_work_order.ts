const BASE_URL = 'http://localhost:4000/api/v1';

async function main() {
    console.log('Logging in...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@metralis.com', password: 'Admin123!' }),
    });

    if (!loginRes.ok) {
        console.error('Login failed', await loginRes.text());
        process.exit(1);
    }

    const loginData = (await loginRes.json()) as { data: { token: string } };
    const token = loginData.data.token;
    // Use the known machine ID from previous run (or fetch the machine named Verification Robot)

    console.log('Fetching Machine...');
    const machinesRes = await fetch(`${BASE_URL}/machines`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const machinesData = (await machinesRes.json()) as { data: Array<{ id: string; name: string }> };
    const machine = machinesData.data.find((m) => m.name === 'Verification Robot');

    if (!machine) {
        console.error('Verification Robot not found');
        process.exit(1);
    }

    console.log('Machine ID:', machine.id);

    console.log('Fetching Work Orders...');
    const woRes = await fetch(`${BASE_URL}/work-orders?machineId=${machine.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!woRes.ok) {
        console.error('Fetch Work Orders failed', await woRes.text());
        process.exit(1);
    }

    const woData = (await woRes.json()) as { data: Array<{ id: string; title: string; status: string }> };
    console.log('Work Orders:', woData.data.length);
    woData.data.forEach((wo) => {
        console.log(`- ${wo.title} (${wo.status})`);
    });

    const uiWo = woData.data.find((wo) => wo.title === 'UI Verification WO');
    if (uiWo) {
        console.log('✅ UI Verification WO FOUND!');
    } else {
        console.error('❌ UI Verification WO NOT found.');
        process.exit(1);
    }
}

main();
