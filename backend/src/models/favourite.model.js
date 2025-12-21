const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    componentVersionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ComponentVersion',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Favourite', favouriteSchema);