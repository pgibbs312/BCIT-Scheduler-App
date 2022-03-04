const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    time: {
        type: Number,
        require: true
    },

}, {timestamps: false});

const Time = mongoose.model('Time', timeSchema);

module.exports = Time;