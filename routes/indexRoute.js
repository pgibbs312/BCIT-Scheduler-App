const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/check_auth");
const Booking = require("../models/booking");
const Rooms = require("../models/rooms");
const Time = require("../models/time");

router.get("/", (req, res) => {
    res.render("landing")
})

router.get("/home", ensureAuthenticated, (req, res) => {
    res.render("index", {
        user: req.user,
    });
});

router.get("/book", ensureAuthenticated, (req, res) => {
    Rooms.find({ })
        .then((rooms) => {
            res.render("booking", {
                rooms: rooms,
                user: req.user,
            });
        });
});

router.post("/book", (req, res) => {
    const room = new Booking({
        name: req.body.name,
        roomNumber: req.body.roomNumber,
        length: req.body.length,
    })
    room.save()
        .then((result) => {
            res.redirect("/home");
        })
        .catch((error) => {
            console.log(error);
        });
});
router.get("/admin-rooms", ensureAuthenticated, (req, res) => {
    res.render("admin-rooms");
})

router.post("/admin-rooms", (req, res) => {
    console.log(req.body.roomNumber);
    const room = new Rooms({
        floor: req.body.floorNumber,
        number: req.body.roomNumber
    })
    room.save()
        .then((result) => {
            res.redirect("/home");
        })
        .catch((error) => {
            console.log(error)
        })
});

router.get("/admin-rooms/posted", (req, res) => {
    res.render("admin-posted");
})


module.exports = router;