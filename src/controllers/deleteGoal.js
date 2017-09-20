const {
  Goal
} = require('../database/goal_schema');

module.exports = (req, res) => {
  Goal.remove({ '_id': req.query.delete }, (err) => {
    if (err) {
      return res.render('error', {
        statusCode: 404,
        message: 'Sorry, cannot delete the goal. Come back when our database cares enough to try again.',
        type: 'error'
      });
    } else {
      res.redirect('goals');
    }
  });
};
