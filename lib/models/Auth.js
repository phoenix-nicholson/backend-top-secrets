const UserService = require('../services/UserService');
const pool = require('../utils/pool');

module.exports = class Auth {
  id;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = this.password_hash;
  }

  static async createUser({ email, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, passwordHash]
    );
    return new Auth(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);
    if (!rows[0]) return null;
    return new Auth(rows[0]);
  }
};
