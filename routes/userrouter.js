const express = require("express");

const router = express.Router();

const {
    mainRouter,
    signupPost,
    homeGet,
    loginGet,
    adminGEt,
    logout,
} = require("../controllers/usercontrol");

router.get("/", mainRouter);
router.post("/", signupPost);
router.get("/homepage", homeGet);
router.get("/login", loginGet);
router.get("/admin", adminGEt);
router.get("/logout", logout);

module.exports = router;
