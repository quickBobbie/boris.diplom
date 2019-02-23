const router = require('express').Router();
const auth = require('../../middleware/auth/auth.middleware');
const controller = require('./test.controller');

router.post('/create', auth.isTeacher, controller.create);

module.exports = router;