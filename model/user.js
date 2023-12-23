const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    confirmpassword: String,
});

const User = mongoose.model("Usersignups", userSchema);

module.exports = User;
