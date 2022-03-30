const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const cookie = req.cookies[process.env.COOKIE_NAME];

  const payload = jwt.verify(cookie, process.env.JWT_SECRET);
  req.user = payload;

  next();
};
