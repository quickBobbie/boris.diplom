const Analytic = require('./analytic.model');
const Test = require('../test/test.model');
const Question = require('../question/question.model');
const Answer = require('../answer/answer.model');

module.exports.create = async (req, res) => {
    try {
        let test = await Test.findById(req.params.testId);
        if (!test) {
            return res.status(404).json({message: "Test not found."});
        }
        let analytic = await new Analytic({user: req.user._id, test: test._id}).save();
        return res.status(201).json({analytic});
    } catch (err) {
        console.log("[analytic.controller] error", err);
        return res.status(500).join({error: "Internal server error."})
    }
};

module.exports.send = async (req, res) => {
    try {
        if (!req.body || !req.body.answerId) {
            return res.status(403).json({message: "Forbidden."});
        }
        let analytic = await Analytic.findById(req.params.analyticId);
        if (!analytic) {
            return res.status(403).json({message: "Forbidden."});
        }
        let answer = await Answer.findById(req.body.answerId);
        if (!answer) {
            return res.status(403).json({message: "Forbidden."});
        }
        if (answer.isValid) {
            analytic.total = analytic.total + answer.total;
            await analytic.save();
        }
        return res.status(200).json({message: "ok"});
    } catch (err) {
        console.log("[analytic.controller] error", err);
        return res.status(500).join({error: "Internal server error."})
    }
};

module.exports.get = async (req, res) => {
    try {
        let analytics = await Analytic.find();

        if (!analytics || !analytics.length) {
            return res.status(404).json({message: "Analytics not found."});
        }

        return res.status(200).send({analytics});
    } catch(err) {
        console.log("[analytic.controller] error", err);
        return res.status(500).join({error: "Internal server error."})
    }
};