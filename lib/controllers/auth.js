const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router().post('/', async (req, res, next) => {
  const user = await UserService.create(req.body);
  res.send(user);
});
