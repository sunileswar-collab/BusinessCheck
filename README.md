# Company Registration & Verification Module (BusinessCheckIn)

A full-stack web application for company registration and profile management with secure authentication, built for Bluestock Fintech internship assignment.

## 🚀 Features

- **User Authentication**: Email/password registration with Firebase integration
- **Mobile Verification**: SMS OTP verification system
- **Multi-step Registration**: Intuitive step-by-step company registration form
- **Profile Management**: Complete company profile with image uploads
- **Secure Backend**: JWT authentication with 90-day validity
- **Image Storage**: Cloudinary integration for logo and banner uploads
- **Responsive Design**: Mobile-first design with Material-UI
- **Input Validation**: Comprehensive validation and sanitization
- **Error Handling**: Robust error handling with user-friendly messages

## 🛠 Tech Stack

### Frontend
- **React 19** with Vite
- **Redux Toolkit** for state management
- **Material-UI** for components and styling
- **React Hook Form** for form handling
- **React Router** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **React Phone Input** for mobile number input

### Backend
- **Node.js 20.x** with Express
- **PostgreSQL 15** database
- **JWT** for authentication
- **bcrypt** for password hashing
- **Firebase Admin** for authentication services
- **Cloudinary** for image storage
- **Express Validator** for input validation
- **Helmet** for security headers

## 📋 Prerequisites

- Node.js 20.x or higher
- PostgreSQL 15
- Firebase account
- Cloudinary account

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BusinessCheck
```

### 2. Backend Setup
```bash
cd BCBackend
npm install
```

Create `.env` file in BCBackend directory:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=company_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=90d

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb company_db

# Import schema
psql -d company_db -f company_db.sql
```

### 4. Frontend Setup
```bash
cd ../BCFrontEnd
npm install
```

Create `.env` file in BCFrontEnd directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd BCBackend
npm run dev
```
Server runs on: http://localhost:5000

### Start Frontend Development Server
```bash
cd BCFrontEnd
npm run dev
```
Frontend runs on: http://localhost:5173

## 📊 Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `full_name`
- `gender` (m/f/o)
- `mobile_no` (Unique)
- `is_mobile_verified`
- `is_email_verified`
- `signup_type`
- `created_at`
- `updated_at`

### Company Profile Table
- `id` (Primary Key)
- `owner_id` (Foreign Key → users.id)
- `company_name`
- `address`
- `city`, `state`, `country`
- `postal_code`
- `website`
- `logo_url`, `banner_url`
- `industry`
- `founded_date`
- `description`
- `social_links` (JSONB)
- `created_at`
- `updated_at`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-mobile` - Mobile OTP verification
- `GET /api/auth/verify-email` - Email verification

### Company Management
- `POST /api/company/register` - Company registration (Protected)
- `GET /api/company/profile` - Get company profile (Protected)
- `PUT /api/company/profile` - Update company profile (Protected)
- `POST /api/company/upload-logo` - Upload company logo (Protected)
- `POST /api/company/upload-banner` - Upload company banner (Protected)

## 🧪 Testing

### Backend Tests
```bash
cd BCBackend
npm test
```

### Frontend Tests
```bash
cd BCFrontEnd
npm test
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: 90-day token validity
- **Input Validation**: Express-validator with custom rules
- **Input Sanitization**: HTML sanitization
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet.js implementation
- **Phone Number Validation**: libphonenumber-js integration

## 📱 Responsive Design

- Mobile-first approach
- Material-UI responsive components
- Optimized for all screen sizes
- Touch-friendly interface

## 🎯 Key Features Implementation

### Multi-step Registration Form
- Step 1: Personal Information
- Step 2: Contact Details with phone input
- Step 3: Mobile OTP verification

### Company Profile Management
- Complete company information form
- Image upload for logo and banner
- Social media links management
- Profile editing capabilities

### State Management
- Redux Toolkit for centralized state
- Persistent authentication state
- Error state management
- Loading states for better UX

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=company_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```
### API Documentation(Postman)

refer file : [ POSTMAN_API_DOCUMENTAION.md ]

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Start production server: `npm start`

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy the `dist` folder to your hosting service

## 📄 License

This project is confidential and proprietary to Bluestock Fintech. Not for public distribution.


**Note**: This project is developed as part of the Bluestock Fintech internship assignment and follows all specified requirements including Firebase authentication, Cloudinary image storage, PostgreSQL database, and comprehensive testing.
