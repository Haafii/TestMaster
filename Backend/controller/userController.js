const asyncHandler = require("express-async-handler");
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, password, role } = req.body;
  if (!fullName || !username || !password || !role) {
    res.status(404);
    throw new Error("Please fill all the fields");
  }
  const userAvailable = await User.findOne({ username });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed Password ${hashedPassword}`);
  const user = await User.create({
    fullName,
    username,
    password: hashedPassword,
    role,
  });
  res.status(201).send(user);
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, username: user.username });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          fullName: user.fullName,
          username: user.username,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "25m" }
    );
    res.status(200).send({ accessToken });
  }else{
    res.status(401)
    throw new Error("Invalid username or password");
  }
});


const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});


const getStudents = asyncHandler(async (req, res) => {
    const students = await User.find({role: "student"});
    res.json(students);
})

const getUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = { registerUser, loginUser, currentUser, getStudents, getUserByUsername };
