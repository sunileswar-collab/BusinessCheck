const pool = require('../config/database');

class Company {
  static async create(companyData) {
    const {
      owner_id, company_name, address, city, state, country, postal_code,
      website, logo_url, banner_url, industry, founded_date, description, social_links
    } = companyData;
    
    const query = `
      INSERT INTO company_profile (
        owner_id, company_name, address, city, state, country, postal_code,
        website, logo_url, banner_url, industry, founded_date, description, social_links
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
    
    const values = [
      owner_id, company_name, address, city, state, country, postal_code,
      website, logo_url, banner_url, industry, founded_date, description, 
      social_links ? JSON.stringify(social_links) : null
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByOwnerId(owner_id) {
    const query = 'SELECT * FROM company_profile WHERE owner_id = $1';
    const result = await pool.query(query, [owner_id]);
    return result.rows[0];
  }

  static async update(id, companyData) {
    const {
      company_name, address, city, state, country, postal_code,
      website, logo_url, banner_url, industry, founded_date, description, social_links
    } = companyData;
    
    const query = `
      UPDATE company_profile SET
        company_name = $1, address = $2, city = $3, state = $4, country = $5,
        postal_code = $6, website = $7, logo_url = $8, banner_url = $9,
        industry = $10, founded_date = $11, description = $12, social_links = $13,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $14
      RETURNING *
    `;
    
    const values = [
      company_name, address, city, state, country, postal_code,
      website, logo_url, banner_url, industry, founded_date, description,
      social_links ? JSON.stringify(social_links) : null, id
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Company;