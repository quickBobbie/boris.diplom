const User = require('./user.model');

module.exports.signup = async (req, res) => {
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

        if (Object.keys(params).length === 0) {
            return res.status(403).json({ message: "No params." });
        }
        if (!params.login || !params.password) {
            return res.status(403).json({ message: "Login and password is required fields." });
        }

        let user = await User.findOne({ login: params.login });

        if (user) {
            return res.status(403).json({ message: "User already exists." });
        }

        user = await new User(params).save();
        let token = req.createToken(user._id);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        return res.status(201).json({ user: user, token: token });
    } catch(err) {
        console.log("[user.controller] error", err);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports.signin = (req, res) => {
    let token = req.createToken(req.user._id);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized." });
    }

    return res.status(200).json({ user: req.user, token: token });
};