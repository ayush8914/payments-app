const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const zod = require("zod")
const mongoose = require("mongoose")

const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number().positive()
})

router.get("/balance", authMiddleware, async(req, res) => {
    const userId = req.user._id;

    const account = await Account.findOne({ userID: userId });
    if(!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }
    return res.json({
        balance: account.balance
    })
})


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const transferPayload = req.body;
        const { success } = transferBody.safeParse(transferPayload);

        if (!success) {
            await session.abortTransaction();
            return res.status(411).json({
                message: "Incorrect Inputs"
            });
        }

        const { amount, to } = transferPayload;

        if (amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        if (to === req.user._id.toString()) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Cannot transfer to yourself"
            });
        }

        const fromAccount = await Account.findOne({ userID: req.user._id }).session(session);
        if (!fromAccount) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Your account not found"
            });
        }

        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userID: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Recipient account not found"
            });
        }

        
        await Account.updateOne(
            { _id: fromAccount._id },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { _id: toAccount._id },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.json({
            message: "Transfer successful"
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            message: "Transfer failed",
            error: error.message
        });
    }
});

module.exports = router