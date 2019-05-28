const mongoose = require('mongoose');
const Test = mongoose.model('test');
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        default: 0 //0 - radiobutton, 1 - checkbox
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test'
    },
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'answer'
        }
    ]
});

questionSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            let test = await Test.findById(this.test);
            if (!test) {
                this.remove();
                return next(new Error("Test not found."))
            }
            test.questions.push(this._id);
            test.total = test.total + this.total || this.total;
            await test.save();
        }

        return next();
    } catch(err) {
        console.log("[question.model] error", err);
        this.remove();
        return next(err);
    }
});

module.exports = mongoose.model('question', questionSchema);