const mongoose = require('mongoose');
const Test = mongoose.model("test");
const analyticSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    total: {
        type: Number,
        default: 0
    },
    allTotal: {
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

analyticSchema.pre("save", async function(next) {
    try {
        if (this.isNew) {
            let test = await Test.findById(this.test);

            if (!test) {
                this.remove();
                return next(new Error("No test"));
            }

            test.analytics.push(this._id);
            await test.save();
        }

        return next()
    } catch(err) {
        console.log("[answer.model] error", err);
        this.remove();
        return next(err);
    }
});

module.exports = mongoose.model('analytic', analyticSchema);