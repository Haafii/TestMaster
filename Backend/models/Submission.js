const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  answers: [{
    question: {
      type: Schema.Types.ObjectId, ref: 'Question',
      required: true

    },
    answerText: {
      type: String
    },
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
