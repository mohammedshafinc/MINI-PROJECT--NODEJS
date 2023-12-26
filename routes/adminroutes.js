const express = require("express");

const adminrouter = express.Router();
const session = require("express-session");
const { getUserList, getAdminHome } = require("../controllers/admincontrol");

adminrouter.get("/adminhome", getAdminHome);
adminrouter.get("/getuserlist", getUserList);

module.exports = adminrouter;
