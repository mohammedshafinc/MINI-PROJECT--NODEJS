const express = require("express");
const multer = require("../middleware/multer");

const adminrouter = express.Router();
const session = require("express-session");
const {
    getUserList,
    getAdminHome,
    getAddProducts,
    postAddProducts,
    getProductUpdate,
    updattingProduct,
    getProductDelete,
} = require("../controllers/admincontrol");

adminrouter.get("/adminhome", getAdminHome);
adminrouter.get("/getuserlist", getUserList);
adminrouter.get("/createproduct", getAddProducts);
adminrouter.get("/update/:productId", getProductUpdate);
adminrouter.get("/delete/:productId", getProductDelete);

adminrouter.post("/createproduct", multer.single("image"), postAddProducts);
adminrouter.post("/updated/:id", multer.single("image"), updattingProduct);

module.exports = adminrouter;
