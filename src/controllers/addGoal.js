const { goal } = require('../database/goal_schema');

module.exports = (req, res) => {
  let userGoal = req.body;
  if (!userGoal.ninetyDays || !userGoal.dailyGoal || !userGoal.description || !userGoal.reward) {
    res.render('error', {
      message: 'Gah', type: 'error'
    });
  }
  console.log(req.body);

  let newGoal = new goal({
    name: req.body.ninetyDays,
    dailyGoal: req.body.dailyGoal,
    description: req.body.description,
    reward: req.body.reward
    // endDate: req.body.date
  });

  newGoal.save((err) => {
    if (err) {
      console.log(err);
      res.render('error', {
        message: 'Sorry, your ambitions are breaking up with you. It\'s not you, it\'s them', type: 'error'
      });
    } else {
      res.redirect('/goals');
    }
  });
};
