// 1.> GET /                => render home page
// 2.> GET /user/login      => login page render
// 3.> GET /user/signup     => signup page render

const express = require("express");
const router = express.Router();

router
    .get("/", (req, res) => {
        // console.log(req.user);
        res.render("home", {
            user: req.user,
        });
    })

    .get("/user/login", (req, res) => {
        res.render("login");
    })

    .get("/user/signup", (req, res) => {
        res.render("signup");
    })

module.exports = router;