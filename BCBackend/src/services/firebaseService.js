const admin = require('../config/firebase');

class FirebaseService {
  static async verifyIdToken(idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid Firebase token');
    }
  }

  static async createUser(email, password) {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        emailVerified: false,
      });
      return userRecord;
    } catch (error) {
      throw new Error('Failed to create Firebase user');
    }
  }

  static async sendEmailVerification(email) {
    try {
      const link = await admin.auth().generateEmailVerificationLink(email);
      // In production, send this link via email service
      return link;
    } catch (error) {
      throw new Error('Failed to send email verification');
    }
  }

  static async sendSMSOTP(phoneNumber) {
    try {
      // In production, implement SMS OTP sending
      // For now, return a mock response
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      throw new Error('Failed to send SMS OTP');
    }
  }

  static async verifySMSOTP(phoneNumber, otp) {
    try {
      // In production, verify OTP with Firebase
      // For now, return success for demo purposes
      return { success: true, verified: true };
    } catch (error) {
      throw new Error('OTP verification failed');
    }
  }
}

module.exports = FirebaseService;