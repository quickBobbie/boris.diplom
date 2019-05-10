const router = require('express').Router();
const controller = require('./answer.controller');

router.post('/create', controller.create);
router.get('/', controller.get);

module.exports = router;