const pool = require('../utils/pool');

module.exports = class Secrets {
  id;
  title;
  description;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
  }

  static async getSecrets() {
    const { rows } = await pool.query(`
    SELECT
     * 
    FROM 
    secrets 
 `);
    return rows.map((row) => new Secrets(row));
  }
};
