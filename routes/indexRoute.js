const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/check_auth");
const { forwardAuthenticated } = require("../middleware/check_auth");
const Booking = require("../models/booking");
const Rooms = require("../models/rooms");
const Time = require("../models/time");

router.get("/", forwardAuthenticated, (req, res) => {
    res.render("login", { message: req.flash('message') })
})

router.get("/home", ensureAuthenticated, (req, res) => {
    const d = new Date();
    let year = d.getFullYear()
    let month = '0' + (d.getMonth() + 1)
    let day = '0' + d.getDate()
    let searchDate = `${year}-${month}-${day}`
    console.log(searchDate)
    Booking.find({date: searchDate})
        .then((bookings) => {
        Rooms.find({ })
            .then((rooms) => {
                Time.find({ })
                    .then((times) => {
                        let btimes = ["9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "timeholder"]
                        res.render("index", {
                            bookings: bookings,
                            rooms: rooms,
                            btimes: btimes,
                            times: times,
                            user: req.user,
                            message: req.flash('message'),
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
    Booking.findOne({date: req.body.date})
        .then(day => {
            console.log(`day is: ${day.date}`)
            if (req.body.roomNumber && req.body.time && day.date == true) {
                console.log('That time has already been booked.');
                req.flash('message', `A booking for room ${req.body.roomNumber} for ${req.body.time} has already been booked.`);
                res.redirect('/home');
            } else {
                const room = new Booking({
                    name: req.body.name,
                    roomNumber: req.body.roomNumber,
                    time: req.body.time,
                    length: req.body.length,
                    date: req.body.date,
                })
                room.save()
                    .then((result) => {
                        res.redirect("/home");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
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

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login/home");
});

router.get("admin-bookings", ensureAuthenticated, (req, res) => {
    res.render("admin-bookings");
})
router.get("/admin-rooms/posted", (req, res) => {
    res.render("admin-posted");
})

router.get("/book-room", ensureAuthenticated, (req, res) => {
    res.render("book-room", {
        user: req.user,
        day: req.query.day
    })
})

module.exports = router;