const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    login: {
        type: String,
    },
    password: {
        type: String,
    },
    firstname: String,
    lastname: String,
    isTeacher: {
        type: Boolean,
        default: false
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'test'
        }
    ],
    analytics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'analytics'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre('save', function(next) {
    if (this.isNew) {
        this.password = crypto.createHmac('sha256', this.password).update(this.login).digest('hex');
    }

    return next();
});

userSchema.methods.comparePassword = function(password) {
    let pwd = crypto.createHmac('sha256', password).update(this.login).digest('hex');

    if (this.password !== pwd) {
        return false;
    }

    return true;
};

userSchema.methods.hashPwd = function(password) {
    let pwd = crypto.createHmac('sha256', password).update(this.login).digest('hex');
    return pwd;
};

userSchema.index({login: 1}, {unique: true});

module.exports = mongoose.model('user', userSchema);