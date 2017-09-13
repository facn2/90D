const { users } = require('../database/user_schema');
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  console.log(req.body);
  let userData = req.body;

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    res.render('error', {
      message: 'Sorry, your user details is a little lacking. King hates you.', type: 'error'
    });
  }

  const hashPw = userData.password;
  bcrypt.hash(hashPw, 10, (err, hashPw) => {
    if (err) { return err; } else {
      let newUser = new users({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashPw
      });

      newUser.save((err) => {
        if (err) {
          console.log(err);
          res.render('error', {
            message: 'Sorry, the information you provided is all kinds of wrong', type: 'error'
          });
        } else {
          res.redirect('/');
        }
      });
    }
  });
};
