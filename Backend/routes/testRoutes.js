const express = require('express');
const { createTest, getTests, getTestsByUserWithSubmissionStatus,getTestById, getTestsCreatedByUser } = require('../controller/testController');
const router  = express.Router();



router.post('/create', createTest);
router.get('/gettest/:username', getTests);
router.get('/submittedtests/:username', getTestsByUserWithSubmissionStatus);
router.get('/tests/:testId', getTestById);
router.get('/createdBy/:username', getTestsCreatedByUser);

module.exports = router;