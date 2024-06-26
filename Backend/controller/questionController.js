const asyncHandler = require('express-async-handler');
const Questions = require('../models/Questions');


const createQuestions = asyncHandler(async (req, res) => {
  const { questionType, questionText, options } = req.body;
  
  try {
    const newQuestion = new Questions({
      questionType,
      questionText,
      options,
    });

    const question = await newQuestion.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = { createQuestions }