const mongoose = require("../model/user");

module.exports = {
    mainRouter: (req, res) => {
        // Check the database connection status

        res.render("signup", { error: "" });
    },
};
