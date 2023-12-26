const express = require("express");

const router = express.Router();
const authentication = require("../middleware/validation");

const {
    mainRouter,
    signupPost,
    homeGet,
    loginGet,

    logout,
    loginPost,
} = require("../controllers/usercontrol");

router.get("/", mainRouter);
router.post("/", authentication, signupPost);
router.post("/login", loginPost);
router.get("/homepage", homeGet);
router.get("/login", loginGet);

router.get("/logout", logout);

module.exports = router;
