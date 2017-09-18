const {
  goal
} = require('../database/goal_schema');
const cookie = require('cookie');

module.exports = (req, res) => {
  let userGoal = req.body;
  const parsedCookie = cookie.parse(req.headers.cookie);
  const email = parsedCookie.user_email;

  if (!userGoal.goal90 || !userGoal.dailyGoal || !userGoal.description || !userGoal.reward) {
    console.log('fuck');
    res.render('error', {
      message: 'Gah',
      type: 'error'
    });
  }
  let newGoal = new goal({
    goals: {
      owner: email,
      goal90: req.body.goal90,
      dailyGoal: req.body.dailyGoal,
      description: req.body.description,
      reward: req.body.reward
    }
  });

  console.log(newGoal);

  newGoal.save((err) => {
    if (err) {
      console.log(err);
      res.render('error', {
        message: 'Sorry, your ambitions are breaking up with you. It\'s not you, it\'s them',
        type: 'error'
      });
    } else {
      res.redirect('/goals');
    }
  });
};
