const Auth = require('../models/Auth');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return Auth.insert({ email, passwordHash });
  }
};
