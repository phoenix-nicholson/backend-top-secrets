const bcryptjs = require('bcryptjs');
const Auth = require('../models/Auth');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcryptjs.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await Auth.createUser({ email, passwordHash });
    return user;
  }

  static async signIn({ email, password }) {
    const user = await Auth.findByEmail(email);
    if (!user) throw new Error('invalid email/password');

    const passwordsMatch = bcryptjs.compareSync(password, user.passwordHash);
    console.log('passwordsMatch', passwordsMatch);
    if (!passwordsMatch) throw new Error('invalid email/password 2');
    return user;
  }
};
