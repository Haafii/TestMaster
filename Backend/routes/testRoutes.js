const express = require('express');
const { createTest, getTests, getTestsByUserWithSubmissionStatus } = require('../controller/testController');
const router  = express.Router();



router.post('/create', createTest);
router.get('/gettest/:username', getTests);
router.get('/submittedtests/:username', getTestsByUserWithSubmissionStatus);

module.exports = router;