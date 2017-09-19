const { Goal } = require('../database/goal_schema');

module.exports = (req, res) => {
  const dailyGoal = req.body.dailyGoal;
  if (req.body.completion) {
    Goal.update({'dailyGoal': dailyGoal},
      { '$set': {'dailyCheck': true}, '$inc': {'dailyCounter': +1}
      }, (err, result) => {
        if (err) {
          console.log(34, err);
        } else {
          res.redirect('/goals');
        }
      });
  } else {
    Goal.update({'dailyGoal': dailyGoal},
      { '$set': {'dailyCheck': false}, '$inc': {'dailyCounter': -1}
      }, (err, result) => {
        if (err) {
          console.log('This did not update', err);
        } else {
          res.redirect('/goals');
        }
      });
  }
};