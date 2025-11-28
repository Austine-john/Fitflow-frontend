// Quick Backend Error Test
// Run this in your browser console (F12 -> Console tab)

async function testBackendError() {
    console.log('🧪 Testing backend endpoints...\n');

    // Test 1: Health check
    console.log('1️⃣ Testing /api/health...');
    try {
        const healthResponse = await fetch('https://fitflow-backend-cygw.onrender.com/api/health');
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthResponse.status, healthData);
    } catch (error) {
        console.error('❌ Health check failed:', error);
    }

    console.log('\n');

    // Test 2: Login endpoint
    console.log('2️⃣ Testing /api/login...');
    try {
        const loginResponse = await fetch('https://fitflow-backend-cygw.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: 'testuser',
                password: 'testpass123'
            })
        });

        console.log('📊 Status:', loginResponse.status);
        console.log('📊 Status Text:', loginResponse.statusText);

        const responseText = await loginResponse.text();
        console.log('📊 Raw Response:', responseText);

        try {
            const loginData = JSON.parse(responseText);
            console.log('📊 Parsed Response:', loginData);

            if (loginResponse.status === 500) {
                console.error('❌ 500 Error Details:', loginData);
                console.log('\n💡 This error is from your backend code.');
                console.log('💡 Check your Render logs for the full stack trace.');
            } else if (loginResponse.status === 401) {
                console.log('⚠️ 401 Unauthorized - User credentials are wrong or user doesn\'t exist');
                console.log('💡 Try registering a user first!');
            } else if (loginResponse.status === 200) {
                console.log('✅ Login successful!', loginData);
            }
        } catch (parseError) {
            console.error('❌ Could not parse response as JSON:', responseText);
        }

    } catch (error) {
        console.error('❌ Login request failed:', error);
    }

    console.log('\n');

    // Test 3: Register endpoint
    console.log('3️⃣ Testing /api/register...');
    try {
        const registerResponse = await fetch('https://fitflow-backend-cygw.onrender.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: 'testuser' + Date.now(),
                email: `test${Date.now()}@example.com`,
                password: 'testpass123'
            })
        });

        const registerData = await registerResponse.json();
        console.log('📊 Register Response:', registerResponse.status, registerData);

        if (registerResponse.status === 201 || registerResponse.status === 200) {
            console.log('✅ Registration successful! Now try logging in with these credentials.');
        }
    } catch (error) {
        console.error('❌ Register request failed:', error);
    }
}

// Run the test
testBackendError();
