const request = require('supertest');
const express = require('express');
const { registerValidation, loginValidation, handleValidationErrors } = require('../middleware/validation');

const app = express();
app.use(express.json());

// Test routes
app.post('/test-register', registerValidation, handleValidationErrors, (req, res) => {
  res.json({ success: true, message: 'Validation passed' });
});

app.post('/test-login', loginValidation, handleValidationErrors, (req, res) => {
  res.json({ success: true, message: 'Validation passed' });
});

describe('Validation Middleware', () => {
  describe('Register Validation', () => {
    it('should pass with valid registration data', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'Password123',
        full_name: 'Test User',
        gender: 'm',
        mobile_no: '+919876543210'
      };

      const response = await request(app)
        .post('/test-register')
        .send(validData)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should fail with invalid email', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'Password123',
        full_name: 'Test User',
        gender: 'm',
        mobile_no: '+919876543210'
      };

      const response = await request(app)
        .post('/test-register')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should fail with weak password', async () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'weak',
        full_name: 'Test User',
        gender: 'm',
        mobile_no: '+919876543210'
      };

      const response = await request(app)
        .post('/test-register')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Login Validation', () => {
    it('should pass with valid login data', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/test-login')
        .send(validData)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should fail with invalid email', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123'
      };

      const response = await request(app)
        .post('/test-login')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});