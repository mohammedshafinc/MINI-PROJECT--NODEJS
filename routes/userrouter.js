const express = require("express");

const router = express.Router();
const authentication = require("../middleware/validation");

const {
    mainRouter,
    signupPost,
    homeGet,
    loginGet,
    getUpdateProfile,
    logout,
    loginPost,
    postUpdateProfile,
    getShowProfile,
} = require("../controllers/usercontrol");

router.get("/", mainRouter);
router.get("/homepage", homeGet);
router.get("/login", loginGet);
router.get("/logout", logout);
router.get("/updateprofile", getUpdateProfile);
router.get("/showprofile", getShowProfile);

router.post("/login", loginPost);
router.post("/", authentication, signupPost);
router.post("/updateprofile", postUpdateProfile);

module.exports = router;
