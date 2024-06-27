const asyncHandler = require('express-async-handler');
const Test = require('../models/Test');


const createTest = asyncHandler(async (req, res) => {
  const { title, description, createdBy, questions, assignedStudents} = req.body;
  try {
    const newTest = new Test({
      title,
      description,
      createdBy,
      questions,
      assignedStudents
    });

    const test = await newTest.save();
    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


const getTests = asyncHandler(async(req, res) =>{
  const { username } = req.params;
  try {
    const tests = await Test.find({ assignedStudents: username }).exec();
    res.json(tests);
  } catch (error) {
    console.error('Error finding tests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


const getTestsByUserWithSubmissionStatus = asyncHandler(async (req, res) => {
  const { username } = req.params;

  try {
    const tests = await Test.aggregate([
      { 
        $match: { createdBy: username } 
      },
      { 
        $unwind: "$assignedStudents" 
      },
      { 
        $match: { "assignedStudents.submissionStatus": true } 
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          description: { $first: "$description" },
          createdBy: { $first: "$createdBy" },
          questions: { $first: "$questions" },
          assignedStudents: { $push: "$assignedStudents" }
        }
      }
    ]);

    res.status(200).json(tests);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const getTestById = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  try {
    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json(test);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = { createTest, getTests, getTestsByUserWithSubmissionStatus, getTestById }