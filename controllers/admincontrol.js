const mongoose = require("mongoose");
const User = require("../model/user");
const Products = require("../model/product");

const bcrypt = require("bcrypt");
module.exports = {
    getAdminHome: async (req, res) => {
        try {
            if (req.session.user && req.session.isAdmin) {
                const findData = await Products.find({});
                console.log(findData);
                res.render("admin/adminhome", { findData });
            } else {
                res.redirect("/login");
            }
        } catch (err) {
            console.log("error", error);
        }
    },
    getUserList: async (req, res) => {
        if (req.session.user && req.session.isAdmin) {
            const userDetails = await User.find({});
            res.render("admin/userlist", { user: userDetails });
        }
    },
    getAddProducts: (req, res) => {
        res.render("admin/addproduct");
    },

    postAddProducts: async (req, res) => {
        const { name, description, price } = req.body;
        if (!req.file.path) {
            res.send("image upload failed");
        } else {
            const path = req.file.path;
            console.log(path);
            const newProduct = new Products({
                name,
                description,
                price,
                image: path,
            });
            await newProduct.save();
            res.redirect("/adminhome");
        }
    },
    getProductUpdate: async (req, res) => {
        const product_id = req.params.productId;
        const find_id = await Products.findById(product_id);
        console.log("f id", find_id);
        res.render("admin/updateproduct", { find_id });
    },
    updattingProduct: async (req, res) => {
        const id = req.params.id;
        const { name, description, price } = req.body;

        try {
            if (!req.file) {
                return res.status(400).send("no image uploaded");
            }
            const imgPath = req.file.path;
            const modify = await Products.updateOne(
                { _id: id },
                { $set: { name, description, price, imgPath } }
            );
            console.log(modify);
            res.redirect("/adminhome");
        } catch (err) {
            console.log("update error", err);
        }
    },
    getProductDelete: async (req, res) => {
        const id = req.params.productId;

        await Products.deleteOne({ _id: id });
        res.redirect("/adminhome");
    },
};
