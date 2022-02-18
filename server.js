const express = require('express');
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const flash = require("connect-flash");
const port = process.env.port || 8080;

// Setting the view engine to ejs and also setting the session to basicly infinate 
const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "secret",
        reverse: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, 
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);
// defining the route to the folders where other files will be for the route
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(flash());

app.use((req, res, next) => {
    console.log(req.session.passport);
    next();
});

// Defining the routes here
app.use("/", indexRoute);
app.use("/auth", authRoute);

const databaseURL = 'mongodb+srv://admin:132435!Awowds@cluster0.ega31.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .then(app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    }))
    .catch((err) => console.log(err));
