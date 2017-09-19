const cookie = require('cookie');
const { verify } = require('jsonwebtoken');
require('env2')('./config.env');

module.exports = (req, res, next) => {
  const parsedCookie = cookie.parse(req.headers.cookie);
  const userSession = parsedCookie.user_session;
  verify(userSession, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      // error page saying not logged in
      return res.render('error', {
        message: 'What you playing at? Go log in!', type: 'error'
      });
    } else {
      res.append('Set-Cookie', `user_email=${decoded}`);
      next();
    }
  });
};
