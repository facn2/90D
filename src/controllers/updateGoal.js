const { Goal } = require('../database/goal_schema');

module.exports = (req, res) => {
  console.log(1, req.body);
  const dailyGoal = req.body.dailyGoal;
  Goal.update({'dailyGoal': dailyGoal},
    { '$set': {'dailyCheck': true}, '$inc': {'dailyCounter': +1}
    }, (err, result) => {
      if (err) {
        console.log(34, err);
      } else {
        res.redirect('/goals');
      }
    });
};
