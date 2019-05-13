const mongoose = require('mongoose');
const Test = mongoose.model('test');
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

materialSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            let test = await Test.findById(this.test);
            if (!test) {
                await this.remove();
                return next(new Error("Test not found"));
            }

            test.materials.push(this._id);
            await test.save();
            return next();
        }
    } catch(err) {
        return next(err);
    }
});

module.exports = mongoose.model('material', materialSchema);