const { users } = require('../database/user_schema');
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  console.log(req.body);
  let userData = req.body;

  // req.checkBody('firstName', 'Invalid name').isAlpha().notEmpty();;
  // req.checkBody('lastName', 'Invalid name').isAlpha();
  // req.sanitize('firstName').escape().trim();

  // let errors = req.getValidationResult();
  // if (errors) {
  //   //If there are errors render the form again, passing the previously entered values and errors
  //   res.render('signup', { title: 'Sign-Up', firstName: firstName, lastName: lastName, email: email, password: password, errors: errors});
  //   return;
  // }

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    res.render('error', {
      message: 'Sorry, hold on, let me give you a better error later', type: 'error'
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
