const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  res.send({ id: '1', email: 'miklo' });
});
