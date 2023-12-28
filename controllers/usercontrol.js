const mongoose = require("mongoose");
const User = require("../model/user");
const Products = require("../model/product");
const Profile = require("../model/profile");
const bcrypt = require("bcrypt");
const config = require("../config/config");

let errors = "";

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
            let errors = "";
            // Extract user data from the request
            const { fullname, email, password, confirmpassword } = req.body;

            // Check if the required fields are provided
            if (!fullname || !email || !password || !confirmpassword) {
                errors = "";
                return res.status(404).render("user/signup", { errors });
            }

            // Create a user object with the provided data

            const userData = {
                fullname,
                email,
                password,
                confirmpassword,
            };

            // Call the function to add the user to the database
            await addUser(userData);

            // Render the signup success view or redirect to a success page
            res.render("user/homepage", { user: userData });
        } catch (error) {
            console.error("Error in mainRouter:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    signupPost: async (req, res) => {
        try {
            const { fullname, email, password, confirmpassword } = req.body;

            const userData = { fullname, email, password, confirmpassword };

            const existingUser = await User.findOne({ email });

            //check if user is exist

            if (existingUser) {
                return res.status(400).render("user/signup", {
                    errors: `an account with ${email} already exist`,
                });
            }

            // User doesn't exist, add the new user to the database
            await addUser(userData);
            req.session.user = userData;
            res.redirect("/homepage");
        } catch (error) {
            console.error("Error in signupPost:", error);
            // res.status(500).send("Internal Server Error");
            // res.status(500).render("error", { error: "Internal Server Error"  });
        }
    },

    homeGet: async (req, res) => {
        if (!req.session.user) {
            return res.redirect("/login");
        } else {
            const showData = await Products.find({});
            const loggedUser = req.session.user;
            // console.log(loggedUser);
            res.render("user/homepage", { showData, user: loggedUser });
        }
    },
    loginGet: (req, res) => {
        res.render("user/login", { errors: "" });
    },
    loginPost: async (req, res) => {
        const { email, password } = req.body;
        let user;
        try {
            let errors = "";
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).render("user/login", {
                    errors: `no user found with ${email}`,
                });
            }
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res.status(401).render("user/login", {
                    errors: "Invalid email or password",
                });
            }
            // } else {
            //     req.session.user = "shafin";
            //     console.log("machaaane");

            //     res.redirect("/homepage");
            // }
            req.session.user = user;
            if (user.usertype === "admin") {
                req.session.isAdmin = true;
                res.redirect("/adminhome");
            } else {
                isAdmin = false;
                res.redirect("/homepage");
            }
        } catch (error) {
            console.log(error);
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log("error in the session destroy", err);
            }
        });
        res.redirect("/login");
    },

    getUpdateProfile: async (req, res) => {
        try {
            if (!req.session.user || !req.session.user._id) {
                res.redirect("/login");
            }

            const userId = req.session.user._id;

            const user = await User.findById(userId);

            // console.log("User ID:", userId);

            // Use $lookup to fetch user and profile details
            const userData = await User.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(userId) },
                },
                {
                    $lookup: {
                        from: "usersignups",
                        localField: "profile",
                        foreignField: "_id",
                        as: "userProfile",
                    },
                },

                {
                    $unwind: {
                        path: "$userProfile",
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ]);
            const userProfile = userData[0].userProfile;
            // console.log(userData);
            // console.log("dhksdfkdf", userProfile);

            const showUser = await Profile.find({});
            // console.log("showing user in get update", showUser);

            res.render("user/updateprofile", {
                userProfile,
                user,
                newDetails: showUser,
            });
            // console.log("new details", showUser);
        } catch (error) {
            console.log("error in get update profile", error);
        }
    },

    postUpdateProfile: async (req, res) => {
        try {
            if (!req.session.user) {
                return res.redirect("/login");
            }

            const userId = req.session.user._id;
            const { name, email, address, place, district, state } = req.body;

            // Update the profile details
            await Profile.findOneAndUpdate(
                { userId },
                { name, email, address, place, district, state },
                { new: true, upsert: true }
            );
            res.redirect("/showprofile");
        } catch (error) {
            console.log("post update is not working", error);
        }
    },
    getShowProfile: async (req, res) => {
        if (!req.session.user) {
            res.redirect("/login");
        }

        const showUser = await Profile.find({});
        console.log(showUser);
        res.render("user/showprofile", { users: showUser });
    },
};
