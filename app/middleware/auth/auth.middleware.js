const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('./auth.controller');
const config = require('./auth.config');

passport.use(new LocalStrategy(config.fields, controller.authByFields));
passport.authByToken = controller.authByToken(config.secret);
passport.createToken = controller.createToken(config.secret);
passport.params = config.options;

module.exports = passport;