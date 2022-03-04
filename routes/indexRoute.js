const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/check_auth");
const { forwardAuthenticated } = require("../middleware/check_auth");

router.get("/", forwardAuthenticated, (req, res) => {
    res.render("landing")
})

router.get("/home", ensureAuthenticated, (req, res) => {
    res.render("index", {
        user: req.user,
    })
})

router.get("/book-room", ensureAuthenticated, (req, res) => {
    res.render("book-room", {
        user: req.user,
        day: req.query.day
    })
})

module.exports = router;