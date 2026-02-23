const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const User = mongoose.model("User", userSchema)


const Accounts = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})

const Account = mongoose.model("Account", Accounts)


module.exports = {
    User,
    Account
}

