const { Goal } = require('../database/goal_schema');

module.exports = (req, res) => {
  const dailyGoal = req.body.dailyGoal;
  if (req.body.completion) {
    Goal.update({'dailyGoal': dailyGoal},
      { '$set': {'dailyCheck': true}, '$inc': {'dailyCounter': +1}
      }, (err, result) => {
        if (err) {
          return res.render('error', {
            statusCode: 404,
            message: 'Sorry, problem checking off your goals. Fun fact: There are at least five species of flying snakes',
            type: 'error'
          });
        } else {
          res.redirect('/goals');
        }
      });
  } else {
    Goal.update({'dailyGoal': dailyGoal},
      { '$set': {'dailyCheck': false}, '$inc': {'dailyCounter': -1}
      }, (err, result) => {
        if (err) {
          return res.render('error', {
            statusCode: 404,
            message: 'Sorry, problem un-checking off your goals. Fun fact: Bananas are curved because they grow towards the sun, instead of toward the ground. This is called negative geotropism',
            type: 'error'
          });
        } else {
          res.redirect('/goals');
        }
      });
  }
};
