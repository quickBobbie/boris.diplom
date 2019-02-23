const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        select: false
    },
    password: {
        type: String,
        select: false
    },
    firstname: String,
    lastname: String,
    isTeacher: {
        type: Boolean,
        default: false
    },
    materials: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'material'
        }
    ],
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'test'
        }
    ]
});

userSchema.methods.comparePassword = function(password) {
    password = crypto.createHmac('sha256', password).update(this.login).digest('hex');

    if (this.password !== password) {
        return false;
    }

    return true;
};

module.exports = mongoose.model('user', userSchema);