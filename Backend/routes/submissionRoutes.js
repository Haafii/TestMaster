const express = require('express');
const { SubmitTest} = require('../controller/submissionController');
const router  = express.Router();



router.post('/testsubmit', SubmitTest);



module.exports = router;