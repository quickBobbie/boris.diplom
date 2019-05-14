const router = require('express').Router();
const auth = require('./middleware/auth/auth.middleware');
const user = require('./modules/user/user.router');
const test = require('./modules/test/test.router');
const analytic = require('./modules/analytic/analytic.router');
const material = require('./modules/material/material.router').public;

router.use('/user', auth.createToken, user);
router.use('/test', auth.authByToken, test);
router.use('/analytic', auth.authByToken, analytic);
router.use('/material', auth.authByToken, material);

module.exports = router;