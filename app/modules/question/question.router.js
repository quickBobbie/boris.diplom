const router = require('express').Router();
const controller = require('./question.controller');
const answer = require('../answer/answer.router');

router.post('/create', controller.create);
router.get('/', controller.get);
router.get('/:questionId', controller.getById);
router.use('/:questionId/answer', controller.next, answer);

module.exports = router;