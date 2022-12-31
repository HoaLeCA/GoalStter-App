const asyncHandler = require("express-async-handler")
// @desc    Get goals
// @router GET/api/goals
// @access Private
const getGoals =  asyncHandler(async(req, res) => {
    res.status(200).json({message : "Get goals"})
})
// @desc    set goals
// @router POST/api/goals
// @access Private
const setGoals = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ("Please add text field")
    }
    res.status(200).json({message : "create goals"})
})
// @desc    Update goals
// @router PUT/api/goals/:id
// @access Private
const updateGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message : "Update goals"})
})
// @desc    Delete goals
// @router DELETE/api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message : "Delete goals"})
})


module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}