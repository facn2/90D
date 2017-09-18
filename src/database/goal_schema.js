const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  goal90: {
    type: String,
    required: true
  },
  dailyGoal: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reward: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = {
  Goal
};
