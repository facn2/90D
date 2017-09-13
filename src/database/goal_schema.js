const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  goals: {
    goal90: {
      name: {type: String, required: true},
      dailyGoal: {type: String, required: true},
      description: {type: String, required: true},
      reward: {type: String, required: true},
      endDate: {type: String, required: true}
    }
  }
});

const goal = mongoose.model('goal', goalSchema);

module.exports = {
  goal
};
