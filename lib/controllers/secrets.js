const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    res.send([
      {
        title: 'thing 1',
        description: 'i am thing 1',
        created_at: '2022-03-30 00:43:12.723336+07',
      },
      {
        title: 'thing 2',
        description: 'i am thing 2',
        created_at: '2022-03-30 00:43:12.723336+07',
      },
    ]);
  } catch (error) {
    next(error);
  }
});
