const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy

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
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
})


module.exports = passport.use(googleLogin);