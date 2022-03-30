const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secrets = require('../models/Secrets');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrects = Secrets.getSecrets();
    res.send(secrects);
  } catch (error) {
    next(error);
  }
});
