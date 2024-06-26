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
    type: Schema.Types.ObjectId,
    ref: 'User',
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
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  // Other test details
});

module.exports = mongoose.model('Test', testSchema);
