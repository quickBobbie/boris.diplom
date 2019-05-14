const mongoose = require('mongoose');
const analyticSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    total: {
        type: Number,
        default: 0
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test'
    },
    testTitle: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('analytic', analyticSchema);