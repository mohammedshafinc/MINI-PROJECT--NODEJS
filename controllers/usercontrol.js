const mongoose = require("mongoose");
const User = require("../model/user");
const config = require("../config/config");


const addUser = async (userData) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.error("Database not connected");
            return;
        }

        const newUser = new User(userData);
        await newUser.save();

        console.log(`new user added succesfully`, newUser);
    } catch (error) {
        console.error("Error adding user", error);
    }
};

module.exports = {
    mainRouter: async (req, res) => {
        try {
            // Extract user data from the request
            const { fullname, email, password, confirmpassword } = req.body;

            // Check if the required fields are provided
            if (!fullname || !email || !password || !confirmpassword) {
                return res.status(404).render("signup", {
                    error: "",
                });
            }

            // Create a user object with the provided data

            const userData = { fullname, email, password, confirmpassword };

            // Call the function to add the user to the database
            await addUser(userData);

            // Render the signup success view or redirect to a success page
            res.render("homepage", { user: userData });
        } catch (error) {
            console.error("Error in mainRouter:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    signupPost: async (req, res) => {
        try {
            const { fullname, email, password, confirmpassword } = req.body;
            const userData = { fullname, email, password, confirmpassword };
            await addUser(userData);
            res.redirect("/homepage");
        } catch (error) {
            console.error("Error in signupPost:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    homeGet: (req, res) => {
        res.render("homepage");
    },
    loginGet: (req, res) => {
        res.render("login", { error: "" });
    },
    adminGEt: (req, res) => {
        res.render("admin");
    },
    logout: (req, res) => {
        res.redirect("/login");
    },
};
