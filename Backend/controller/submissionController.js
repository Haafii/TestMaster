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

const getSubmissionsByTestAndUser = asyncHandler(async (req, res) => {
  const { testId, student } = req.params;

  try {
    const submissions = await Submission.find({ test: testId, student: student });

    res.status(200).json(submissions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


const getSubmissionsByUser = asyncHandler(async (req, res) => {
  console.log(req.params)
  const { username } = req.params;

  try {
    const submissions = await Submission.find({ student: username });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


const markSubmission = asyncHandler(async (req, res) => {
  const { testId, student } = req.params;
  const { score } = req.body;

  try {
    const submission = await Submission.findOneAndUpdate(
      { test: testId, student: student },
      { score: score },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = { SubmitTest, getSubmissionsByTestAndUser, markSubmission, getSubmissionsByUser };
