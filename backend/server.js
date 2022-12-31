const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddelware")
const port = process.env.PORT || 3000;



const app = express();

// add function to use body
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/goals", require ("./routers/goalRoutes"))

app.use(errorHandler)

app.listen (port, ()=>{
    console.log(`Server started on port ${port}`);
})