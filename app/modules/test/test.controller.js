const Test = require('./test.model');

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
        if (Object.keys(params).length === 0 || !(params.title && params.description)) {
            return res.status(403).json({ message: "No params." });
        }

        let saveData = {
            title: params.title || false,
            description: params.description || false,
            owner: req.user._id
        };
        for (let key in saveData) {
            if (!saveData[key]) {
                delete saveData[key];
            }
        }
        let test = await new Test(saveData).save();
        return res.status(201).json({ test });
    } catch(err) {
        console.log("[test.controller] error =>", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports.get = async (req, res) => {
    try {
        let search = req.query && req.query.search || null;
        let find = {};
        if (search) {
            find.title = new RegExp(search);
        }
        let tests = await Test.find(find).sort({createdAt: -1});

        if (!tests || !tests.length) {
            return res.status(404).json({message: "Tests not found."});
        }

        return res.status(200).json({tests});
    } catch (err) {
        console.log("[test.controller] error", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports.getById = async (req, res) => {
    try {
        let test = await Test.findById(req.params.testId)
            .populate({
                path: "materials",
                select: "title"
            });
        if (!test) {
            return res.status(404).json({message: "Test not found."});
        }
        return res.status(200).json({test});
    } catch (err) {
        console.log("[test.controller] error", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports.next = async (req, res, next) => {
    try {
        let test = await Test.findById(req.params.testId);

        if (!test) {
            return res.status(404).json({message: "Test not found."});
        }

        req.test = test;
        return next();
    } catch (err) {
        console.log("[test.controller] error", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};