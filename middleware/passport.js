const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel").User;
const bcrypt = require("bcryptjs");

const GOOGLE_CLIENT_ID = '407110781224-06dd2cgcpeedqk8kem91mhjspbbpthr2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const googleLogin = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/login/callback"
},
function(accessToken, refreshToken, profile, done) {
    // This is to create and or find the user in the database
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    // });
    return done(null, profile);
}
);
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
})

const localLogin = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
},
(req, email, password, done) => {
    // Find User
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log("User not found.")
            return done(null, false, req.flash('message', "User not found, please try again."))
        }
        bcrypt.compare(password, user.password, function(error, isMatch) {
            if (error) {
                throw error
            } else if (!isMatch) {
                console.log("Password doesn't match!");
                return done(null, false, req.flash('message', "Incorrect password."))
            } else {
                console.log("Passwords match")
                return done(null, user, req.flash('message'));
            }
        })
    });
});

passport.use(googleLogin)
passport.use(localLogin)

module.exports = passport;