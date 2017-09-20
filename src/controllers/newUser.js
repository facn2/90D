const { Users } = require('../database/user_schema');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
require('env2')('./config.env');

module.exports = (req, res) => {
  let userData = req.body;

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    return res.render('error', {
      statusCode: 404,
      message: 'Sorry, your user details is a little lacking.',
      type: 'error'
    });
  }

  const hashPw = userData.password;
  bcrypt.hash(hashPw, 10, (err, hashPw) => {
    if (err) {
      return res.render('error', {
        statusCode: 404,
        message: 'Sorry, hash peewee problem.',
        type: 'error'
      });
    } else {
      let newUser = new Users({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashPw
      });

      newUser.save((err) => {
        if (err) {
          return res.render('error', {
            statusCode: 404,
            message: 'Sorry, trouble with saving user. Shrug.',
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
