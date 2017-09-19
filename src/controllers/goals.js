const { Goal } = require('../database/goal_schema');
const { Users } = require('../database/user_schema');
const cookie = require('cookie');
require('env2')('./config.env');

module.exports = (req, res) => {
  // const email = res.locals.email;
  const parsedCookie = cookie.parse(req.headers.cookie);
  const userEmail = parsedCookie.user_email;
  // get user and goal data from the database
  Users.findOne({'email': userEmail}, (err, user) => {
    if (err) {
      return res.render('error', {
        statusCode: 404,
        message: 'Sorry, cannot find the user email. Sometimes, you just have to accept your losses and move on.',
        type: 'error'
      });
    }
    const username = user.firstName;
    Goal.find({ 'owner': userEmail }, (err, results) => {
      if (err) {
        return res.render('error', {
          statusCode: 404,
          message: 'Sorry, cannot find the goals. Good time to look up and smell the falafel balls.',
          type: 'error'
        });
      } else {
      // pass all results to the goals view
        res.render('goals', { goals: results, username: username });
      }
    });
  });
};
