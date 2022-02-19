const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roomNumber: {
        type: Number,
        require: true
    },
    length: {
        type: Number,
        required: true
    },

}, {timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;