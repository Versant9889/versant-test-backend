const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  partA: {
    description: String,
    questions: [{
      question: String,
      _id: String
    }]
  },
  partB: {
    description: String,
    questions: [{
      question: String,
      _id: String
    }]
  },
  partC: {
    description: String,
    questions: [{
      question: String,
      _id: String
    }]
  },
  partD: {
    description: String,
    questions: [{
      question: String,
      _id: String
    }]
  },
  partE: {
    description: String,
    questions: [{
      question: String,
      _id: String
    }]
  },
  partF: {
    description: String,
    questions: [{
      question: String,
      _id: String
    }]
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;