const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = UserAnswer;

