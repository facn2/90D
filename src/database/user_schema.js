const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userDetails: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
  },
  goals: [
    {
      goal90: {
        name: {type: String, required: true},
        dailyGoal: {type: String, required: true},
        description: {type: String, required: true},
        reward: {type: String, required: true},
        endDate: {type: String, required: true}
      }
    }
  ]
});

const users = mongoose.model('user', userSchema);

module.exports = {
  users
};
