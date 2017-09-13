const { users } = require('../database/user_schema');

module.exports = (req, res, next) => {
  console.log(req.body);
  let userData = req.body;
  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    console.log(1);
    res.render('error', {
      message: 'Sorry, the information you provided is all kinds of wrong', type: 'error'
    });
  } else {
  // password hashing here

    let newUser = new users({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password
    });

    newUser.save((err, user) => {
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
};
