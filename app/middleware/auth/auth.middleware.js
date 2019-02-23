const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStraqtegy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const controller = require('./auth.controller');
const config = require('./auth.config');
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : config.secret
};

passport.use('local', new LocalStrategy(config.fields, controller.authByFields));
passport.use('jwt', new JwtStraqtegy(jwtOptions, controller.authByToken));
passport.createToken = controller.createToken(config.secret);
passport.isTeacher = controller.isTeacher;
passport.params = config.options;

module.exports = passport;