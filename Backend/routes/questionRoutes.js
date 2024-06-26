const express = require('express');
const { createQuestions } = require('../controller/questionController');
const router  = express.Router();



router.post('/create', createQuestions);

module.exports = router;