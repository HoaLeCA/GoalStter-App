const mongoose = require ("mongoose")

const GoalSchema = mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    text: {
        type: String,
        required: [true, "message add a text value"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Goal", GoalSchema )