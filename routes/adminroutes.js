const express = require("express");

const adminrouter = express.Router();
const session = require("express-session");
const { postAdmin, getAdminHome } = require("../controllers/admincontrol");

adminrouter.get("/adminhome", getAdminHome);

module.exports = adminrouter;
