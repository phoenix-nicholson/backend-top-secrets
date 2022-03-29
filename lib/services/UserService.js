const bcryptjs = require('bcryptjs');
const Auth = require('../models/Auth');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = bcryptjs.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return Auth.createUser({ email, passwordHash });
  }
};
