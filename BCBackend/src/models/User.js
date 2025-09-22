const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(userData) {
    const { email, password, full_name, gender, mobile_no, signup_type = 'e' } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (email, password, full_name, gender, mobile_no, signup_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, full_name, gender, mobile_no, signup_type, is_mobile_verified, is_email_verified, created_at
    `;
    
    const values = [email, hashedPassword, full_name, gender, mobile_no, signup_type];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, full_name, gender, mobile_no, signup_type, is_mobile_verified, is_email_verified, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateMobileVerification(id, isVerified) {
    const query = 'UPDATE users SET is_mobile_verified = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    await pool.query(query, [isVerified, id]);
  }

  static async updateEmailVerification(id, isVerified) {
    const query = 'UPDATE users SET is_email_verified = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    await pool.query(query, [isVerified, id]);
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = User;