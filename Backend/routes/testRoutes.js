const express = require('express');
const { updateTest } = require('../controller/testController');
const router  = express.Router();



router.post('/create', updateTest);

module.exports = router;