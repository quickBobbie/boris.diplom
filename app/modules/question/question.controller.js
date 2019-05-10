const Question = require('./question.model');

module.exports.create = async (req, res) => {
    try {
        let params = req.body;

        for (let key in params) {
            if (typeof params[key] === 'string') {
                params[key] = params[key]
                    .replace(/<[^>]+>/gi, '')
                    .replace(/\s+/gi, ' ')
                    .trim();

                if (!params[key]) {
                    delete params[key];
                }
            }
        }

        if (!params.title || !params.total) {
            return res.status(403).json({message: "No title and / or total params."})
        }
        if (String(req.test.owner) !== String(req.user._id)) {
            return res.status(403).json({message: "You not owner this test."})
        }

        let question = await new Question({...params, test: req.test._id}).save();
        return res.status(201).json({question});
    } catch(err) {
        console.log('[question.controller] error', err);
        return res.status(500).json({error: "Internal server error."})
    }
};

module.exports.get = async (req, res) => {
    try {
        let questions = await Question.find({test: req.test._id})
            .populate({
                path: 'answers'
            });

        if (!questions || !questions.length) {
            return res.status(404).json({message: "Questions not found."});
        }

        return res.status(200).json({questions});
    } catch(err) {
        console.log('[question.controller] error', err);
        return res.status(500).json({error: "Internal server error."})
    }
};

module.exports.getById = async (req, res) => {
    try {
        let question = await Question.findById(req.params.questionId)
            .populate({
                path: 'answers'
            });

        if (!question) {
            return res.status(404).json({message: "Question not found."});
        }

        return res.status(200).json({question});
    } catch(err) {
        console.log('[question.controller] error', err);
        return res.status(500).json({error: "Internal server error."})
    }
};

module.exports.next = async (req, res, next) => {
    try {
        let question = await Question.findById(req.params.questionId);

        if (!question || String(question.test) !== String(req.test._id)) {
            return res.status(404).json({message: "Question not found."});
        }

        req.question = question;
        return next();
    } catch(err) {
        console.log('[question.controller] error', err);
        return res.status(500).json({error: "Internal server error."})
    }
};