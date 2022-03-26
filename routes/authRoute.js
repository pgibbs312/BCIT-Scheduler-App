const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/check_auth");
const router = express.Router();
const User = require("../models/userModel").User;
// const userVerification = require("../models/userVerification");


router.get("/login/home", forwardAuthenticated, (req, res) => {
    res.redirect("/")
})

router.get("/register", forwardAuthenticated, (req, res) => {
    res.render("register", { message: req.flash('message') } )
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
});

router.post("/register", (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                console.log('That user already exists.')
                req.flash('message', `Account with email "${req.body.email}" already exists, please try a new email.`)
                res.redirect("/auth/register")
            } else {
                const user = new User({
                    name: req.body.name, 
                    email: req.body.email,
                    password: req.body.password,
                });
                user.save()
                    .then((result) => {
                        req.flash('message', `Successfully registered new account! Try logging in now.`)
                        res.redirect("/auth/login/home")
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
});

router.get("/login",
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/login/callback', 
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/auth/login/home',
    })
);

router.post("/login/local", passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/auth/login/home",
    })
);

// router.post("/register", (req, res) => {
//     User.findOne({email: req.body.email})
//         .then(user => {
//             if (user) {
//                 req.flash('message', `Account with email "${req.body.email}" already exists, please try a new email.`)
//                 res.redirect("/landing")
//             } else {
//                 const user = new User({
//                     name: req.body.name, 
//                     email: req.body.email,
//                     password: req.body.password,
//                 });
//                 user.save()
//                     .then((result) => {
//                         res.redirect("/auth/login")
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     })
//             }
//         })
// });

module.exports = router;