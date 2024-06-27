// const asyncHandler = require('express-async-handler');
// const Submission = require('../models/Submission');

// const SubmitTest = asyncHandler(async(req, res) =>{
//   try {
//     const submission = await Submission.create(req.body);
//     res.status(201).json(submission);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }

// })

// module.exports = { SubmitTest };


const asyncHandler = require('express-async-handler');
const Submission = require('../models/Submission');
const Test = require('../models/Test');

const SubmitTest = asyncHandler(async (req, res) => {
  try {
    // Create a new submission
    const submission = await Submission.create(req.body);

    // Update the submissionStatus for the corresponding student in the Test schema
    await Test.updateOne(
      { _id: req.body.test, 'assignedStudents.studentId': req.body.student },
      { $set: { 'assignedStudents.$.submissionStatus': true } }
    );

    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { SubmitTest };
