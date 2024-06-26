const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
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
  // Other question details
});

module.exports = mongoose.model('Question', questionSchema);
