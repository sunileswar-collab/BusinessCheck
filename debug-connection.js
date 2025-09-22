// Debug script to test full flow
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function debugFlow() {
  console.log('🔍 Debugging Frontend-Backend Connection...\n');
  
  // 1. Test health endpoint
  try {
    console.log('1. Testing health endpoint...');
    const health = await axios.get('http://localhost:5000/health');
    console.log('✅ Backend is running:', health.data.message);
  } catch (err) {
    console.log('❌ Backend not running. Start with: npm run dev in BCBackend folder');
    return;
  }
  
  // 2. Test registration
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    full_name: 'Test User',
    gender: 'm',
    mobile_no: '+1234567890'
  };
  
  try {
    console.log('\n2. Testing registration...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✅ Registration successful');
    console.log('   User ID:', registerResponse.data.data.user.id);
    console.log('   Token received:', !!registerResponse.data.data.token);
    
    // 3. Test login
    console.log('\n3. Testing login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful');
    console.log('   Token received:', !!loginResponse.data.data.token);
    
    console.log('\n🎉 All tests passed! Frontend should work now.');
    
  } catch (err) {
    console.log('❌ Error:', err.response?.data || err.message);
    
    if (err.code === 'ECONNREFUSED') {
      console.log('\n💡 Solution: Start backend server first:');
      console.log('   cd BCBackend && npm run dev');
    }
  }
}

debugFlow();