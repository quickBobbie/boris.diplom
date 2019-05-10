const Answer = require('./answer.model');

module.exports.create = async (req, res) => {
    try {
        let params = req.body;
        params.title = params.title.replace(/<[^>]+>/gi, '')
            .replace(/\s+/gi, ' ')
            .trim();

        if (!params.title) {
            return res.status(404).json({message: "No title."});
        }
        if (String(req.test.owner) !== String(req.user._id)) {
            return res.status(403).json({message: "You not owner this test."})
        }

        let answer = await new Answer({...params, question: req.question._id}).save();
        return res.status(201).json({answer});
    } catch(err) {
        console.log('[answer.controller] error', err);
        return res.status(500).json({message: "Internal server error."});
    }
};

module.exports.get = async (req, res) => {
    try {
        let answers = await Answer.find({question: req.question._id});

        if (!answers || !answers.length) {
            return res.status(404).json({message: "No answers."});
        }

        return res.status(200).json({answers});
    } catch(err) {
        console.log('[answer.controller] error', err);
        return res.status(500).json({message: "Internal server error."});
    }
};