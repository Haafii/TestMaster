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


const getQuestions = asyncHandler(async(req, res) =>{
  const questions = await Questions.find();
  res.json(questions);
})

const getQuestionById = asyncHandler(async(req, res) =>{
  const { questionId } = req.params;
  try {
    const question = await Questions.findById(questionId).exec();
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error finding question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



module.exports = { createQuestions, getQuestions, getQuestionById }