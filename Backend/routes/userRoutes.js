const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controller/userController');



router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;