const { goal } = require('../database/goal_schema');

module.exports = (req, res) => {
  let userGoal = req.body;
  console.log(6, res.locals);
  console.log(2, userGoal.goal90);
  console.log(3, userGoal.dailyGoal);
  console.log(4, userGoal.description);
  console.log(5, userGoal.reward);

  if (!userGoal.goal90 || !userGoal.dailyGoal || !userGoal.description || !userGoal.reward) {
    console.log('fuck')
    res.render('error', {
      message: 'Gah', type: 'error'
    });
  } else {
    let newGoal = new goal({
      goals: {
        goal90: req.body.goal90,
        dailyGoal: req.body.dailyGoal,
        description: req.body.description,
        reward: req.body.reward
      }
    });

    console.log(newGoal);

    newGoal.save((err) => {
      if (err) {
        console.log(1, err);
        res.render('error', {
          message: 'Sorry, your ambitions are breaking up with you. It\'s not you, it\'s them', type: 'error'
        });
      } else {
        return res.redirect('/');
      }
    });
  }
};
