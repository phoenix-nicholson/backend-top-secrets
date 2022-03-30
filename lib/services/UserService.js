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

  static async signIn({ email, password }) {
    const user = await Auth.findByEmail(email);
    if (!user) throw new Error('invalid email/password');

    const passwordsMatch = bcryptjs.compareSync(password, user.passwordHash);
    if (!passwordsMatch) throw new Error('invalid email/password');
    return user;
  }
};
