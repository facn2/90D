const { Goal } = require('../database/goal_schema');
const cookie = require('cookie');
require('env2')('./config.env');

module.exports = (req, res) => {
  // const email = res.locals.email;
  const parsedCookie = cookie.parse(req.headers.cookie);
  const userEmail = parsedCookie.user_email;
  // get some data from the database
  Goal.find({ 'owner': userEmail }, (err, results) => {
    if (err) {
      console.log('This is a find error: ', err);
    } else {
      res.render('goals', { goals: results });
    }
  });
};
