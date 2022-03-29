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
  .post('/', async (req, res, next) => {
    res.send({
      message: 'Signed in successfully',
      email: 'miklo',
      password: 'imkindacute',
    });
  });
