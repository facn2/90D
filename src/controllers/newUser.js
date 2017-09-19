const { Users } = require('../database/user_schema');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
require('env2')('./config.env');

module.exports = (req, res) => {
  let userData = req.body;

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    res.render('error', {
      statusCode: 404,
      message: 'Sorry, your user details is a little lacking. King hates you.',
      type: 'error'
    });
  }

  const hashPw = userData.password;
  bcrypt.hash(hashPw, 10, (err, hashPw) => {
    if (err) { return err; } else {
      let newUser = new Users({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashPw
      });

      newUser.save((err) => {
        if (err) {
          res.render('error', {
            statusCode: 404,
            message: 'Sorry, the information you provided is all kinds of wrong',
            type: 'error'
          });
        } else {
          let token = sign(userData.email, process.env.SECRET_KEY);
          res.append('Set-Cookie', `user_session=${token}`);
          res.append('Set-Cookie', `user_email=${userData.email}`);
          res.redirect('/goals');
        }
      });
    }
  });
};
