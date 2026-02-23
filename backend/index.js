require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express()
const rootRouter = require("./routes/index")

app.use(cors())
app.use(express.json())
app.use("/api/v1", rootRouter)


app.listen(3000, () => {
    console.log("Server is running on port 3000")
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err)
    })
})
