# User Registration Test Guide

## Prerequisites

1. **Database Setup**: Ensure PostgreSQL is running and `company_db` database exists
2. **Backend Server**: Start the backend server on port 5000
3. **Postman**: Have Postman installed with the collection imported

## Quick Start

### 1. Start Backend Server
```bash
# Option 1: Use the batch script
start-backend.bat

# Option 2: Manual start
cd BCBackend
npm install
npm run dev
```

### 2. Verify Server is Running
Open browser and go to: http://localhost:5000/health

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Test 1: User Registration in Postman

### Step-by-Step Instructions:

1. **Open Postman** and import the collection:
   - File → Import → Select `Company_Registration_API.postman_collection.json`

2. **Find "Register User" request**:
   - Navigate to Authentication folder
   - Click on "Register User"

3. **Configure the request**:
   - Method: `POST`
   - URL: `http://localhost:5000/api/auth/register`
   - Headers: `Content-Type: application/json`

4. **Set request body**:
   - Go to "Body" tab
   - Select "raw" and "JSON"
   - Use this exact test data:

```json
{
  "email": "test@example.com",
  "password": "Test123!",
  "full_name": "John Doe",
  "gender": "m",
  "mobile_no": "+919876543210"
}
```

5. **Send the request**:
   - Click "Send" button

### Expected Response:

**Status Code**: `201 Created`

**Response Body**:
```json
{
  "success": true,
  "message": "User registered successfully. Please verify mobile OTP.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "test@example.com",
      "full_name": "John Doe",
      "gender": "m",
      "mobile_no": "+919876543210",
      "is_mobile_verified": false,
      "is_email_verified": false
    }
  }
}
```

### Validation Points:

✅ **Status Code**: Must be `201`  
✅ **Success Field**: `success: true`  
✅ **JWT Token**: Present in `data.token`  
✅ **User Data**: Complete user object in `data.user`  
✅ **User ID**: Numeric ID assigned  
✅ **Email**: Matches input  
✅ **Verification Status**: Both mobile and email should be `false`  

## Alternative Testing Methods

### Method 1: Using Node.js Test Script
```bash
# Make sure backend is running first
node test-registration.js
```

### Method 2: Using cURL
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "full_name": "John Doe",
    "gender": "m",
    "mobile_no": "+919876543210"
  }'
```

## Common Issues & Solutions

### Issue 1: Connection Refused
**Problem**: Cannot connect to server  
**Solution**: Ensure backend server is running on port 5000

### Issue 2: Database Connection Error
**Problem**: Database connection failed  
**Solution**: 
- Check PostgreSQL is running
- Verify database `company_db` exists
- Check credentials in `.env` file

### Issue 3: Validation Errors
**Problem**: 400 Bad Request with validation errors  
**Solution**: Ensure all required fields are provided with correct format:
- Email: Valid email format
- Password: Min 6 chars with uppercase, lowercase, and number
- Mobile: Valid international format with country code

### Issue 4: User Already Exists
**Problem**: 400 Bad Request - "User already exists"  
**Solution**: Use a different email address or clear the database

## Database Verification

To verify the user was created in the database:

```sql
-- Connect to PostgreSQL
psql -d company_db

-- Check if user was created
SELECT id, email, full_name, gender, mobile_no, is_mobile_verified, is_email_verified, created_at 
FROM users 
WHERE email = 'test@example.com';
```

## Next Steps

After successful registration:
1. Test mobile OTP verification
2. Test user login
3. Test company registration (requires authentication)

## Security Notes

- Passwords are automatically hashed using bcrypt
- JWT tokens have 90-day expiration
- Input is sanitized and validated
- Phone numbers are validated using libphonenumber-js