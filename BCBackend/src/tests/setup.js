// Test setup file
require('dotenv').config({ path: '.env.test' });

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only';
process.env.JWT_EXPIRES_IN = '1h';

// Mock Firebase Admin if not configured
if (!process.env.FIREBASE_PROJECT_ID) {
  jest.mock('../config/firebase', () => ({
    auth: () => ({
      verifyIdToken: jest.fn().mockResolvedValue({ uid: 'test-uid' })
    })
  }));
}

// Global test timeout
jest.setTimeout(30000);