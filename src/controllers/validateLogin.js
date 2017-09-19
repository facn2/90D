const { Users } = require('../database/user_schema');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
require('env2')('./config.env');

module.exports = (req, res) => {
  let userData = req.body;
  if (!userData.email || !userData.password) {
    return res.render('error', {
      statusCode: 404,
      message: 'Sorry, your user details are a little lacking. We disapprove.',
      type: 'error'
    });
  }

  Users.find({ email: userData.email }, (err, user) => {
    if (err) {
      // if an error was returned
      return res.render('error', {
        statusCode: 404,
        message: 'Sorry, error, doing erroneous things.',
        type: 'error'
      });
    } else if (!user) { // this isn't quite right - actually returns empty array
      // Nothing matched
      return res.render('error', {
        statusCode: 404,
        message: 'Sorry, the information you provided is all kinds of wrong.',
        type: 'error'
      });
    } else {
      // this is okay
      let dbPassword = user[0].password;
      bcrypt.compare(userData.password, dbPassword, (err, response) => {
        if (err) {
          console.log(err);
        } else if (!response) {
          return res.render('error', {
            message: 'Yo those password don\'t match!',
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
