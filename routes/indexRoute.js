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
    Booking.find({ })
        .then((bookings) => {
        Rooms.find({ })
            .then((rooms) => {
                Time.find({ })
                    .then((times) => {
                        let btimes = ["9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"]
                        res.render("index", {
                            bookings: bookings,
                            rooms: rooms,
                            btimes: btimes,
                            times: times,
                            user: req.user,
                        });
                    });
            });
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
        time: req.body.time,
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
router.get("/admin-times", ensureAuthenticated, (req, res) => {
    res.render("admin-times");
});

router.post("/admin-times", (req, res) => {
    console.log(`Time value: ${req.body.time}`);
    console.log(typeof(req.body.time));
    const time = new Time({
        time: req.body.time
    })
    time.save()
        .then((result) => {
            res.redirect("/home");
        });
});


router.get("admin-bookings", ensureAuthenticated, (req, res) => {
    res.render("admin-bookings");
})
router.get("/admin-rooms/posted", (req, res) => {
    res.render("admin-posted");
})


module.exports = router;