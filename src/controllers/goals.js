const { goals } = require('../database/user_schema');
require('env2')('./config.env');

module.exports = (req, res) => {
  const email = res.locals.email;
  // get some data from the database
  // goals.findAll({ 'email': email });
  console.log(goals.find({ 'email': email }));
  // all goals with user email
  res.render('goals');
};
