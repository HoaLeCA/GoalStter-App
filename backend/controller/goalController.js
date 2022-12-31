const asyncHandler = require("express-async-handler")

const Goal = require("../model/goalModel")
// @desc    Get goals
// @router GET/api/goals
// @access Private
const getGoals =  asyncHandler(async(req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})
// @desc    set goals
// @router POST/api/goals
// @access Private
const setGoals = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ("Please add text field")
    }
        const goal = await Goal.create({
            text: req.body.text,
        })
    

    res.status(200).json(goal)
})
// @desc    Update goals
// @router PUT/api/goals/:id
// @access Private
const updateGoals = asyncHandler(async(req, res) => {

    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{new: true})
    
    res.status(200).json(updateGoal)
})
// @desc    Delete goals
// @router DELETE/api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
    
    
})


module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}