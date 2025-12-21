const mongoose = require('mongoose');

const componentVersionSchema = new mongoose.Schema({
    componentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
        required: true
    },
    version: {
        type: String,
        required: true
    },
    promptUsed: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: false
    },
    dependencies: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('ComponentVersion', componentVersionSchema);