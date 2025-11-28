// Diagnostic script to check backend health and specific error details
async function diagnoseBackend() {
    const BASE_URL = 'https://fitflow-backend-a27k.onrender.com';
    console.log(`🔍 Diagnosing backend at: ${BASE_URL}\n`);

    // 1. Check Health
    try {
        console.log('1️⃣ Checking Health Endpoint...');
        const health = await fetch(`${BASE_URL}/api/health`);
        console.log(`   Status: ${health.status}`);
        const text = await health.text();
        console.log(`   Response: ${text}`);
    } catch (e) {
        console.error('   ❌ Health check failed:', e);
    }

    // 2. Check Auth/Me (The critical new endpoint)
    try {
        console.log('\n Checking /auth/me Endpoint (Expect 401 or 200)...');
        const me = await fetch(`${BASE_URL}/auth/me`, {
            headers: { 'Authorization': 'Bearer invalid_token_test' }
        });
        console.log(`   Status: ${me.status}`);
        if (me.status === 404) {
            console.error('   ❌ CRITICAL: /auth/me returned 404! The code is NOT deployed correctly.');
        } else if (me.status === 401) {
            console.log('   ✅ Endpoint exists (got 401 as expected with invalid token)');
        } else {
            console.log(`   Response: ${await me.text()}`);
        }
    } catch (e) {
        console.error('   ❌ Auth check failed:', e);
    }

    // 3. Check Login Error Details
    try {
        console.log('\n3️⃣ Checking Login Error Details...');
        const login = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'test', password: 'test' })
        });
        console.log(`   Status: ${login.status}`);
        const text = await login.text();
        console.log(`   Response Body: ${text}`);
    } catch (e) {
        console.error('   ❌ Login check failed:', e);
    }
}

diagnoseBackend();
