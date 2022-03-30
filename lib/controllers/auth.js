const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    const user = await UserService.signIn(req.body);
    res
      .cookie(process.env.COOKIE_NAME, user.authToken(), {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
      .send({ message: 'Signed in successfully', user });
  });
