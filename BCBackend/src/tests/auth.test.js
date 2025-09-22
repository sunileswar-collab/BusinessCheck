const request = require('supertest');
const app = require('../server');

// Test configuration from environment variables
const TEST_CONFIG = {
  email: process.env.TEST_EMAIL || 'test@example.com',
  password: process.env.TEST_PASSWORD || 'TestPass123!',
  fullName: process.env.TEST_FULL_NAME || 'Test User',
  mobile: process.env.TEST_MOBILE || '+919876543210'
};

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: `test_${Date.now()}@example.com`,
        password: TEST_CONFIG.password,
        full_name: TEST_CONFIG.fullName,
        gender: 'm',
        mobile_no: `+91987654${Math.floor(Math.random() * 10000)}`
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('registered successfully');
      expect(response.body.data).toHaveProperty('user_id');
    });

    it('should return validation error for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: TEST_CONFIG.password,
        full_name: TEST_CONFIG.fullName,
        gender: 'm',
        mobile_no: TEST_CONFIG.mobile
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('POST /api/auth/login', () => {
    let testUser;

    beforeAll(async () => {
      // Create test user for login tests
      const userData = {
        email: `login_test_${Date.now()}@example.com`,
        password: TEST_CONFIG.password,
        full_name: TEST_CONFIG.fullName,
        gender: 'm',
        mobile_no: `+91987654${Math.floor(Math.random() * 10000)}`
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);
      
      testUser = { ...userData, id: response.body.data.user_id };
    });

    it('should login user with valid credentials', async () => {
      const credentials = {
        email: testUser.email,
        password: testUser.password
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
    });

    it('should return error for invalid credentials', async () => {
      const credentials = {
        email: testUser.email,
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});

describe('Company Endpoints', () => {
  let authToken;
  let testUser;

  beforeAll(async () => {
    // Create test user and login to get auth token
    const userData = {
      email: `company_test_${Date.now()}@example.com`,
      password: TEST_CONFIG.password,
      full_name: TEST_CONFIG.fullName,
      gender: 'm',
      mobile_no: `+91987654${Math.floor(Math.random() * 10000)}`
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });
    
    authToken = loginResponse.body.data.token;
    testUser = userData;
  });

  describe('POST /api/company/register', () => {
    it('should register company with valid data', async () => {
      const companyData = {
        company_name: 'Test Company',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        postal_code: '12345',
        industry: 'Technology',
        website: 'https://testcompany.com'
      };

      const response = await request(app)
        .post('/api/company/register')
        .set('Authorization', `Bearer ${authToken}`)
        .send(companyData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('company_name', 'Test Company');
    });

    it('should return error without auth token', async () => {
      const companyData = {
        company_name: 'Test Company',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        postal_code: '12345',
        industry: 'Technology'
      };

      const response = await request(app)
        .post('/api/company/register')
        .send(companyData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access token required');
    });
  });
});