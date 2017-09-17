const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  goals: {
    owner: {type: String, required: true},
    goal90: {type: String, required: true},
    dailyGoal: {type: String, required: true},
    description: {type: String, required: true},
    reward: {type: String, required: true}
  }
});

const goal = mongoose.model('goal', goalSchema);

module.exports = {
  goal
};
