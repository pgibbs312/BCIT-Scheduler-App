const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// will look into implementing
const userVerificationSchema = new Schema ({
    userId: {
        type: String,
    },
    uniqueString: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    }
});

const userVerification = mongoose.model('userVerification', userVerificationSchema)

module.exports = {
    userVerification,
}