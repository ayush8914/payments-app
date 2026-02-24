const express = require("express");
const router = express.Router();
const zod = require("zod");
const  { User , Account } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware")

const signupBody = zod.object({
    first_name: zod.string().min(1).max(50),
    last_name: zod.string().min(1).max(50),
    userName: zod.string().min(3).max(30).email(),
    password: zod.string().min(6)
})

const signinBody = zod.object({
    userName: zod.string().min(3).max(30).email(),
    password: zod.string().min(6)
})

const profileUpdateBody = zod.object({
    first_name: zod.string().min(1).max(50).optional(),
    last_name: zod.string().min(1).max(50).optional(),
    password: zod.string().min(6).optional()
})

router.get("/", (req, res) => {
    res.send("User route")
})

router.post("/signup", async (req, res) => {
    const signupPayload = req.body;
    const { success } = signupBody.safeParse(signupPayload);
    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({ userName: signupPayload.userName });
    if(existingUser) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    try{
        const user = await User.create({
            first_name: signupPayload.first_name,
            last_name: signupPayload.last_name,
            userName: signupPayload.userName,
            password: await bcrypt.hash(signupPayload.password, 10)
         });

        const userID = user._id;
       
        const account = await Account.create({
            userID: userID,
            balance: 1 + Math.random() * 10000
        }) 

        const token = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "User created successfully",
            token : token
        })
    }
    catch(err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
})


router.post("/signin", async (req, res) => {
    const signinPayload = req.body;
    const { success } = signinBody.safeParse(signinPayload);

    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({ userName: signinPayload.userName});
    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(signinPayload.password, user.password);
    if(!isPasswordCorrect) {
        return res.status(401).json({
            message: "Incorrect Password"
        })
    }

    const userID = user._id;
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
        message: "User signed in successfully",
        token : token
    })
})

router.put("/", authMiddleware, async (req, res) => {
    const profileUpdatePayload = req.body;
    const { success } = profileUpdateBody.safeParse(profileUpdatePayload);
    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    try{
        if(profileUpdatePayload.password) {
            profileUpdatePayload.password = await bcrypt.hash(profileUpdatePayload.password, 10);
        }
        const userID = req.user._id;
        await User.findByIdAndUpdate(userID, profileUpdatePayload);
        res.status(200).json({
            message: "Profile updated successfully"
        })
    }
    catch(err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
})


router.get("/bulk", async (req, res) => {
    try{
        const filter = req.query.filter || "";
        
        const users = await User.find({
            $or : [{
                    first_name : {
                        $regex: filter,
                    }
                },{
                    last_name : {
                        $regex: filter,
                    }
                }]
        });
        res.status(200).json({
            users : users.map(user => ({
                first_name: user.first_name,
                last_name: user.last_name,
                userName: user.userName,
                _id: user._id
            }))
        })
    }
    catch(err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
})


module.exports = router