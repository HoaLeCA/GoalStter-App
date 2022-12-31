const express = require("express")
const router = express.Router()
const {getGoals, setGoals, updateGoals, deleteGoals} = require("../controller/goalController")

router.route("/").get(getGoals).post(setGoals)
// router.get("/", getGoals)
// router.post("/", setGoals)
router.route("/:id").put(updateGoals).delete(deleteGoals)
// router.put("/:id", updateGoals)
// router.delete("/:id", deleteGoals)

module.exports = router

