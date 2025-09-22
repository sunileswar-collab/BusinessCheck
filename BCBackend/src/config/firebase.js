const admin = require('firebase-admin');

// Mock Firebase Admin for development
const mockFirebaseAdmin = {
  auth: () => ({
    verifyIdToken: async (token) => ({ uid: 'mock-uid', email: 'mock@example.com' }),
    createUser: async (userData) => ({ uid: 'mock-uid', ...userData }),
    generateEmailVerificationLink: async (email) => `https://mock-verification-link.com?email=${email}`
  })
};

// Only initialize Firebase if all required env vars are present
if (process.env.FIREBASE_PROJECT_ID && 
    process.env.FIREBASE_PRIVATE_KEY && 
    process.env.FIREBASE_CLIENT_EMAIL) {
  
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  
  module.exports = admin;
} else {
  console.log('Firebase credentials not found, using mock Firebase for development');
  module.exports = mockFirebaseAdmin;
}