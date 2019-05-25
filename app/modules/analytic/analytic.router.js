const router = require('express').Router();
const controller = require('./analytic.controller');

router.get('/start/:testId', controller.create);
router.get('/', controller.get);
router.get('/:analyticId', controller.getById);
router.put('/send/:analyticId', controller.send);

module.exports = router;