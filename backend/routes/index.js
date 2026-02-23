const express = require("express");
const router = express.Router()
const userRouter = require("./user")
const accountRouter = require("./account");
const { authMiddleware } = require("../middleware")

router.get("/", authMiddleware, (req, res) => {
    res.send("Welcome to the API");
})

router.use("/user", userRouter)
router.use("/account", accountRouter)


module.exports = router