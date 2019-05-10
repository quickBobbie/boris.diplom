const mongoose = require('mongoose');
const User = mongoose.model('user');
const testSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'question'
        }
    ],
    total: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    analytics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'analytic'
        }
    ],
    materials: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'material'
        }
    ],
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
        return next();
    } catch(err) {
        return next(err)
    }
});

module.exports = mongoose.model('test', testSchema);