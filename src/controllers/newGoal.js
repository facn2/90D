const { Users } = require('../database/user_schema');
const cookie = require('cookie');

module.exports = (req, res) => {
  const parsedCookie = cookie.parse(req.headers.cookie);
  const userEmail = parsedCookie.user_email;

  Users.findOne({'email': userEmail}, (err, user) => {
    if (err) {
      console.log('This is the error from findOne: ', err);
      return err;
    }
    res.render('newGoal', {username: user.firstName});
  });
};
