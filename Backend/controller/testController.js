const asyncHandler = require('express-async-handler');
const Test = require('../models/Test');


const updateTest = asyncHandler(async (req, res) => {
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



module.exports = { updateTest }