const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test'
    },
    path: String,
    title: String
});

module.exports = mongoose.model('material', materialSchema);