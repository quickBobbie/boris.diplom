const router = require('express').Router();
const auth = require('./middleware/auth/auth.middleware');
const user = require('./modules/user/user.router');

router.use('/user', auth.createToken, user);

module.exports = router;