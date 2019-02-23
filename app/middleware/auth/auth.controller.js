const jwt = require('jsonwebtoken');
const User = require('../../modules/user/user.model');

module.exports.authByFields = async (login, password, callback) => {
    try {
        let user = await User.findOne({ login: login })

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

module.exports.authByToken = async (payload, callback) => {
    try {
        let user = await User.findbyId(payload.id);
        if (!user) {
            return callback(null, false);
        }
        return callback(null, user);
    } catch(err) {
        console.log('[auth.controller] error', err);
        callback(err, null);
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

module.exports.isTeacher = (req, res, next) => {
    if (req.user.isTeacher) {
        return next();
    } else {
        return res.status(403).json({ message: "Forbidden." })
    }
};