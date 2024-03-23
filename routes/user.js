// 1.> POST /user/signup
// 2.> POST /user/login
// 3.> GET /user/:username
// 4.> GET /user/logout

const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/user")
const { handleUserSignup, handleUserLogin, handleUserProfile, handleUserLogout } = require("../controllers/user");

router
    .post("/signup", handleUserSignup)
    
    .post("/login", handleUserLogin)

    .get("/doctor", (req, res) => {
        res.render("doctor");
    })

    .get("/logout", handleUserLogout)
    
    .get("/doctor2", requireAuth, (req, res) => {
        res.render("home2");
    })
    // .get("/:username", handleUserProfile);

module.exports = router;