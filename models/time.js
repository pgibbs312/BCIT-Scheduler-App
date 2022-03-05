const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    time: {
        type: String,
        require: true
    },

}, {timestamps: true});

const Time = mongoose.model('Time', timeSchema);

module.exports = Time;