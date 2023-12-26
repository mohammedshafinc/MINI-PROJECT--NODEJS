const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // isAdmin: {
    //     type: Number,
    //     required: true,
    // },
    // isVarified: {
    //     type: Number,
    //     default: 0,
    // },
    usertype: {
        type: String,
        default: "user",
    },
});

//bcyrpt for pssword hashing

userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("Usersignups", userSchema);

module.exports = User;
