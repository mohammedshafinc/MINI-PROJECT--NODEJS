const express = require("express");

const router = express.Router();

const { mainRouter } = require("../controllers/maincontroller");

router.get("/", mainRouter);

module.exports = router;
