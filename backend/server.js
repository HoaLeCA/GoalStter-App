const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const colors = require("colors")
const connectDB = require("./config/db")
// dotenv.config()
const port = process.env.PORT || 3000;

connectDB()

const app = express();

// add function to use body
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/goals", require ("./routers/goalRoutes"))
app.use("/api/users", require ("./routers/userRoutes"))

app.use(errorHandler)

app.listen (port, ()=>{
    console.log(`Server started on port ${port}`);
})