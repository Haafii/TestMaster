const express = require('express');
const { SubmitTest, getSubmissionsByTestAndUser, markSubmission, getSubmissionsByUser} = require('../controller/submissionController');
const router  = express.Router();



router.post('/testsubmit', SubmitTest);
router.get('/submissions/:testId/:student', getSubmissionsByTestAndUser);
router.put('/submissions/:testId/:student/mark', markSubmission);
router.get('/submissions/:username', getSubmissionsByUser);



module.exports = router;