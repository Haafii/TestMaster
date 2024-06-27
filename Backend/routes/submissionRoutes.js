const express = require('express');
const { SubmitTest, getSubmissionsByTestAndUser} = require('../controller/submissionController');
const router  = express.Router();



router.post('/testsubmit', SubmitTest);
router.get('/submissions/:testId/:student', getSubmissionsByTestAndUser);



module.exports = router;