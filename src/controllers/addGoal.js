const {
  Goal
} = require('../database/goal_schema');
const cookie = require('cookie');

module.exports = (req, res) => {
  let userGoal = req.body;
  const parsedCookie = cookie.parse(req.headers.cookie);
  const email = parsedCookie.user_email;

  if (!userGoal.goal90 || !userGoal.dailyGoal || !userGoal.description || !userGoal.reward) {
    console.log('fuck');
    return res.render('error', {
      statusCode: 404,
      message: 'Sorry, you are missing some fields. It\'s all or nothing with us. Read the tips page if you have any problemo.',
      type: 'error'
    });
  }
  let newGoal = new Goal({
    owner: email,
    goal90: req.body.goal90,
    dailyGoal: req.body.dailyGoal,
    description: req.body.description,
    reward: req.body.reward,
    endDate: req.body.endDate
  });

  newGoal.save((err) => {
    if (err) {
      return res.render('error', {
        statusCode: 404,
        message: 'Sorry, there is an error saving your goal.',
        type: 'error'
      });
    } else {
      res.redirect('/goals');
    }
  });
};
