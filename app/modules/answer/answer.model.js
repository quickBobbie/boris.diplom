const mongoose = require('mongoose');
const Question = mongoose.model('question');
const answerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: false
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    }
});

answerSchema.pre('save', async function (next) {
    try {
        let question = await Question.findById(this.question);
        if (!question) {
            this.remove();
            return next(new Error("No question"))
        }
        question.answers.push(this._id);
        await question.save();
        return next();
    } catch (err) {
        console.log("[answer.model] error", err);
        this.remove();
        return next(err);
    }
});

module.exports = mongoose.model('answer', answerSchema);