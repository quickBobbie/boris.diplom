const mongoose = require('mongoose');
const User = mongoose.model('user');
const userSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    point: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
const testSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'question'
        }
    ],
    total: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    users: [userSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

testSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            let user = await User.findById(this.owner);
            if (!user) {
                this.remove();
                return next(new Error("User is not defined."));
            }
            user.tests.push(this._id);
            user.save();
        }
        next();
    } catch(err) {
        next(err)
    }
});

module.exports = mongoose.model('test', testSchema);