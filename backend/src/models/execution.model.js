const mongoose = require('mongoose');

const executionSchema = new mongoose.Schema({
    componentVersionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ComponentVersion',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'running', 'completed', 'failed'],
        default: 'pending'
    },
    output: {
        type: String,
        required: false
    },
    errorLog: {
        type: String,
        required: false
    },
    executedAt: {
        type: Date,
        required: false
    }
});
module.exports = mongoose.model('Execution', executionSchema);