const jwt = require('jsonwebtoken');
const User = require('../../modules/user/user.model');

module.exports.authByFields = async (login, password, callback) => {
    try {
        let user = await User.findOne({ login: login });

        if (!user) {
            return callback(null, false);
        }
        if (user.comparePassword(password)) {
            return callback(null, user)
        }

        return callback(null, false);
    } catch(err) {
        console.log('[auth.controller] error', err);
        callback(err, null);
    }
};

module.exports.authByToken = (secret) => {
    return async (req, res, next) => {
        try {
            let token = req.headers['access_token'] || req.query['access_token'];
            let payload = jwt.decode(token, secret);
            let id = payload.id || null;
            let user = await User.findById(id);

            if (!user) {
                return res.status(401).json({message: "Unauthorized."});
            }

            req.user = user;
            return next();
        } catch(err) {
            console.log('[auth.controller] error', err);
            return res.status(401).json({message: "Unauthorized."});
        }
    }
};

module.exports.createToken = secret => {
    return (req, res, next) => {
        req.createToken = id => {
            return jwt.sign({ id: id }, secret);
        };
        next();
    };
};