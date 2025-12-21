const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
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
    tokensUsed: {
        type: Number,
        required: true
    },
    generations: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Usage', usageSchema);