const express = require("express");

const router = express.Router();

const {
    mainRouter,
    signupPost,
    homeGet,
} = require("../controllers/usercontrol");

router.get("/", mainRouter);
router.post("/", signupPost);
router.get("/homepage", homeGet);

module.exports = router;
