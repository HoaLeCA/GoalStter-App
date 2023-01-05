const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel');
const User = require('../model/userModel');
// @desc    Get goals
// @router GET/api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
// @desc    set goals
// @router POST/api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text field');
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});
// @desc    Update goals
// @router PUT/api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  //const user = await User.findById(req.user.id) --> don't need to find user again as it is on middleware
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // make sure the login user matched goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateGoal);
});
// @desc    Delete goals
// @router DELETE/api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  //const user = await User.findById(req.user.id); --> user already on middle
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // make sure the login user matched goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
