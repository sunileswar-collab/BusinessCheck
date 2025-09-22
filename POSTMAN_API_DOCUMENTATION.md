# Company Registration API - Postman Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. User Registration
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe",
  "gender": "m",
  "mobile_no": "+919876543210",
  "signup_type": "email"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "full_name": "John Doe",
      "gender": "m",
      "mobile_no": "+919876543210",
      "is_mobile_verified": false,
      "is_email_verified": false,
      "signup_type": "email"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. User Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "full_name": "John Doe",
      "is_mobile_verified": true,
      "is_email_verified": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Mobile Verification
**POST** `/auth/verify-mobile`

**Request Body:**
```json
{
  "mobile_no": "+919876543210",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Mobile number verified successfully"
}
```

### 4. Email Verification
**GET** `/auth/verify-email?token=verification_token_here`

**Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

## 🏢 Company Management Endpoints

### 1. Company Registration
**POST** `/company/register`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "company_name": "Tech Solutions Inc",
  "address": "123 Business Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "postal_code": "400001",
  "website": "https://techsolutions.com",
  "industry": "Technology",
  "founded_date": "2020-01-15",
  "description": "Leading technology solutions provider",
  "social_links": {
    "linkedin": "https://linkedin.com/company/techsolutions",
    "twitter": "https://twitter.com/techsolutions"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Company registered successfully",
  "data": {
    "company": {
      "id": 1,
      "owner_id": 1,
      "company_name": "Tech Solutions Inc",
      "address": "123 Business Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "postal_code": "400001",
      "website": "https://techsolutions.com",
      "industry": "Technology",
      "founded_date": "2020-01-15T00:00:00.000Z",
      "description": "Leading technology solutions provider",
      "social_links": {
        "linkedin": "https://linkedin.com/company/techsolutions",
        "twitter": "https://twitter.com/techsolutions"
      },
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### 2. Get Company Profile
**GET** `/company/profile`
**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "company": {
      "id": 1,
      "owner_id": 1,
      "company_name": "Tech Solutions Inc",
      "address": "123 Business Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "postal_code": "400001",
      "website": "https://techsolutions.com",
      "logo_url": "https://res.cloudinary.com/demo/image/upload/logo.jpg",
      "banner_url": "https://res.cloudinary.com/demo/image/upload/banner.jpg",
      "industry": "Technology",
      "founded_date": "2020-01-15T00:00:00.000Z",
      "description": "Leading technology solutions provider",
      "social_links": {
        "linkedin": "https://linkedin.com/company/techsolutions",
        "twitter": "https://twitter.com/techsolutions"
      },
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### 3. Update Company Profile
**PUT** `/company/profile`
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "company_name": "Tech Solutions Private Limited",
  "description": "Updated description for leading technology solutions provider",
  "website": "https://www.techsolutions.com",
  "social_links": {
    "linkedin": "https://linkedin.com/company/techsolutions",
    "twitter": "https://twitter.com/techsolutions",
    "facebook": "https://facebook.com/techsolutions"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Company profile updated successfully",
  "data": {
    "company": {
      "id": 1,
      "company_name": "Tech Solutions Private Limited",
      "description": "Updated description for leading technology solutions provider",
      "website": "https://www.techsolutions.com",
      "social_links": {
        "linkedin": "https://linkedin.com/company/techsolutions",
        "twitter": "https://twitter.com/techsolutions",
        "facebook": "https://facebook.com/techsolutions"
      },
      "updated_at": "2024-01-15T11:45:00.000Z"
    }
  }
}
```

### 4. Upload Company Logo/Banner
**POST** `/company/upload-media`
**Headers:** `Authorization: Bearer <token>`

**Request Body (Form Data):**
```
file: [Select image file]
type: "logo" or "banner"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logo uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/demo/image/upload/v1234567890/logo_abc123.jpg",
    "public_id": "logo_abc123"
  }
}
```

### 5. Upload File
**POST** `/company/upload-file`
**Headers:** `Authorization: Bearer <token>`

**Request Body (Form Data):**
```
file: [Select file]
```

**Response (200):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/demo/raw/upload/v1234567890/document_xyz789.pdf",
    "public_id": "document_xyz789"
  }
}
```

---

## 🔍 Health Check

### Server Health Check
**GET** `/health`

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ❌ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Route /api/invalid-endpoint not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Database connection failed"
}
```

---

## 📝 Postman Collection Setup

### Environment Variables
Create a Postman environment with:
```
base_url: http://localhost:5000/api
token: {{auth_token}}
```

### Pre-request Script for Authentication
Add this to requests requiring authentication:
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

### Test Script to Save Token
Add this to login/register requests:
```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
    const response = pm.response.json();
    if (response.data && response.data.token) {
        pm.environment.set('token', response.data.token);
    }
}
```

---

## 🔧 Testing Workflow

1. **Health Check** - Verify server is running
2. **Register User** - Create new user account
3. **Login** - Get authentication token
4. **Verify Mobile** - Complete mobile verification
5. **Register Company** - Create company profile
6. **Get Profile** - Retrieve company data
7. **Upload Media** - Add logo/banner
8. **Update Profile** - Modify company information

---

**Note:** Replace placeholder values with actual data when testing. Ensure backend server is running on port 5000 before making requests.