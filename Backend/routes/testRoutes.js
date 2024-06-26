const express = require('express');
const { createTest, getTests } = require('../controller/testController');
const router  = express.Router();



router.post('/create', createTest);
router.get('/gettest/:username', getTests);

module.exports = router;