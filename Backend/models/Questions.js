const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionType: {
    type: String,
    enum: ['multiple-choice', 'short-answer', 'essay'],
    required: true
  },
  questionText: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }], 
});

module.exports = mongoose.model('Question', questionSchema);
