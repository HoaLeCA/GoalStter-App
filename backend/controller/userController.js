const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
// @desc    register user
// @router POST/api/users
// @access Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  // check if user exist

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }
  // hash password using Bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  // check use

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

  // res.json({message: "Register User"})
});

// @desc    Authenticate user
// @router POST/api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  // check for user password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credential');
  }

  // res.json({message: "Login User"})
});
// @desc   GET user data
// @router GET/api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  // req.user.id is setted on middleware by req.user. Therefore, we can get it on here
  //const {_id, name, email} = await User.findById(req.user.id)

  res.status(200).json(req.user); // req.use already got from middleware
});

// Generate token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
