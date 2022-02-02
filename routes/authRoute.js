const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/check_auth");
const router = express.Router();

router.get("/login",
    passport.authenticate('google', { scope: ['profile'] }));
router.get('/login/callback', 
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/auth/login',
    })
);

module.exports = router;