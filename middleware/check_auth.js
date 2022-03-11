module.exports = {
    // Checking if user is authenticated, if the user is authenticated it proceeds
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // if user is not authenticated it returns them to the login page
        res.redirect("/auth/login");
    },
    // if user is not authenticated it forwards them otherwise the will be redirected home
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            console.log("not authenticated");
            return next();
        }
        res.redirect("/home");
    }
}