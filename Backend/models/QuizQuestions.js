const mongoose = require('mongoose');

// Define a schema for quiz questions
const quizSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String], // An array of strings
    required: true
  }
});

// Create a model based on the schema
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
