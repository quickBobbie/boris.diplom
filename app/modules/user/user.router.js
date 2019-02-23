const router = require('express').Router();
const auth = require('../../middleware/auth/auth.middleware');
const controller = require('./user.controller');

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);

module.exports = router;