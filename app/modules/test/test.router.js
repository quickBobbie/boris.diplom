const router = require('express').Router();
const controller = require('./test.controller');
const question = require('../question/question.router');
const material = require('../material/material.router');

router.post('/create', controller.create);
router.get('/', controller.get);
router.get('/:testId', controller.getById);
router.use('/:testId/question', controller.next, question);
router.use('/:testId/material', controller.next, material);

module.exports = router;