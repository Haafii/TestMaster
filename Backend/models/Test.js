const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdBy: {
    type: String,
    required: true
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  assignedStudents: [
    {
      studentId: {
        type: String,
        required: true
      },
      submissionStatus: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = mongoose.model('Test', testSchema);
