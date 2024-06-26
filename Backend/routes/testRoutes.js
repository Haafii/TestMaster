const express = require('express');
const { createTest } = require('../controller/testController');
const router  = express.Router();



router.post('/create', createTest);

module.exports = router;