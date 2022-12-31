const mongoose = require ("mongoose")

const GoalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "message add a text value"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Goal", GoalSchema )