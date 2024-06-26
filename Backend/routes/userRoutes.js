const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { registerUser, loginUser, currentUser, getStudents } = require('../controller/userController');
const validateToken = require('../middleware/validateTokenHandler');




router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken, currentUser);
router.get('/students', getStudents);




module.exports = router;