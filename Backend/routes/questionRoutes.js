const express = require('express');
const { createQuestions, getQuestions } = require('../controller/questionController');
const router  = express.Router();



router.post('/create', createQuestions);
router.get('/get', getQuestions);

module.exports = router;