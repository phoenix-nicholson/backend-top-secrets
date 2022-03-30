const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secrets = require('../models/Secrets');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const user = await Secrets.createSecret(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secrets.getSecrets();
      res.send(secrets);
    } catch (error) {
      next(error);
    }
  });
