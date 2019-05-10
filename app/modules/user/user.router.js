const router = require('express').Router();
const auth = require('../../middleware/auth/auth.middleware');
const controller = require('./user.controller');

router.post('/signup', controller.signup);
router.post('/signin', auth.authenticate('local', auth.params), auth.createToken, controller.signin);
router.put('/update', auth.authByToken, controller.update);
router.put('/pwd', auth.authByToken, controller.pwd);

module.exports = router;