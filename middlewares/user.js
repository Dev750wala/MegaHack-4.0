const USER = require("../models/doctor-model");
const jwtToken = require("jsonwebtoken");
const keys = require("../secrets/key");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwtToken.verify(token, keys.tokenSecretKey.key, async (error, decodedToken) => {
            if (error) {
                // console.error(error); 
                res.redirect("/user/login");
            } else {
                next();
            }
        })
    } else {
        res.redirect("/user/login");
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    // console.log(token);
    if(token) {
        jwtToken.verify(token, keys.tokenSecretKey.key, async (err, decodedToken) => {
            if(err) {
                req.user = null;
                // console.log(req.user);
                next();
            } else {
                let user = await USER.findById(decodedToken.id);

                req.user = user;
                // console.log(req.user);
                next();
            }
        });
    } else {
        req.user = null;
        next();
    }
};

module.exports = {
    requireAuth,
    checkUser
}
