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
        if (!params.login || !params.password_1 || !params.password_2) {
            return res.status(403).json({ message: "Login and password is required fields." });
        }
        if (params.password_1 !== params.password_2) {
            return res.status(403).json({ message: "Passwords do not match." });
        }

        params.password = params.password_1;
        delete params.password_1;
        delete params.password_2;

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

module.exports.update = async (req, res) => {
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

        let user = await User.findById(req.user._id);

        if (!user) {
            return res.status(403).json({message: "Forbidden."});
        }

        user.login = params.login || req.user.login;
        user.firstname = params.firstname || req.user.firstname;
        user.lastname = params.lastname || req.user.lastname;
        user = await user.save();
        return res.status(200).json({user});
    } catch(err) {
        console.log("[user.controller] error", err);
        return res.status(500).json({message: "Internal server error."});
    }
};

module.exports.pwd = async (req, res) => {
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

        if (Object.keys(params).length < 3 || !params.oldpassword || !params.password_1 || !params.password_2) {
            return res.status(403).json({ message: "No params." });
        }
        if (params.password_1 !== params.password_2) {
            return res.status(403).json({message: "New passwords do not match."});
        }

        let user = await User.findById(req.user._id);
        if (!user) {
            return res.status(403).json({message: "Forbidden."});
        }
        if (!user.comparePassword(params.oldpassword)) {
            return res.status(403).json({message: "Invalid old password."});
        }

        user.password = user.hashPwd(params.password_1);
        await user.save();
        return res.status(200).json({message: "Updated."});
    } catch(err) {
        console.log("[user.controller] error", err);
        return res.status(500).json({message: "Internal server error."});
    }
};