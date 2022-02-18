const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },

}, {timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;