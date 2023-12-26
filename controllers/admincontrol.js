const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
module.exports = {
    getAdminHome: (req, res) => {
        try {
            if (req.session.user && req.session.isAdmin) {
                res.render("adminhome");
            } else {
                res.redirect("/login");
            }
        } catch (err) {
            console.log("error", error);
        }
    },
};
