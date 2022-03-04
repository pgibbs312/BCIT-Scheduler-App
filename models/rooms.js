const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    floor: {
        type: Number,
        required: true
    }, 
    number: {
        type: Number,
        required: true
    }, 
}, {timestamps: true});

const Rooms = mongoose.model('Rooms', roomSchema);

module.exports = Rooms;