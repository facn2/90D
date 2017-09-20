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
        message: 'Sorry, cannot find the user. Come back when our database cares enough to try again.',
        type: 'error'
      });
    }
    const username = user.firstName;
    Goal.findOne({ '_id': req.query.goal }, (err, result) => {
      if (err) {
        return res.render('error', {
          statusCode: 404,
          message: 'Sorry, cannot find goal details. Come back when our database cares enough to try again.',
          type: 'error'
        });
      } else {
        // pass all results to the goals view
        res.render('goaldetails', { goal: result, username: username });
      }
    });
  });
};
