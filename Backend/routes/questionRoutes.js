const express = require('express');
const { createQuestions, getQuestions, getQuestionById } = require('../controller/questionController');
const router  = express.Router();



router.post('/create', createQuestions);
router.get('/get', getQuestions);
router.get('/get/:questionId', getQuestionById);


module.exports = router;