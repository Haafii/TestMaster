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



module.exports = { createTest, getTests }