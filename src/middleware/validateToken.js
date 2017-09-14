const cookie = require('cookie');
const { verify } = require('jsonwebtoken');
require('env2')('./config.env');

module.exports = (req, res, next) => {
  const parsedCookie = cookie.parse(req.headers.cookie);
  const userSession = parsedCookie.user_session;
  verify(userSession, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.locals);
      next();
    }
  });
};
