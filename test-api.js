const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('Testing API endpoints...\n');
  
  // Test health endpoint
  try {
    const health = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check:', health.data);
  } catch (err) {
    console.log('❌ Health check failed:', err.message);
    return;
  }
  
  // Test registration
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    full_name: 'Test User',
    gender: 'm',
    mobile_no: '+1234567890'
  };
  
  try {
    console.log('\n🔄 Testing registration...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✅ Registration successful:', registerResponse.data);
    
    // Test login with same credentials
    console.log('\n🔄 Testing login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful:', loginResponse.data);
    
  } catch (err) {
    console.log('❌ API Error:', err.response?.data || err.message);
  }
}

testAPI();