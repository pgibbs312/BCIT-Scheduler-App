const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/check_auth");

router.get("/home", ensureAuthenticated, (req, res) => {
    res.render("index", {
        user: req.user,
    })
})
module.exports = router;