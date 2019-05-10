const router = require('express').Router();
const controller = require('./analytic.controller');

router.get('/start/:testId', controller.create);
router.get('/', controller.get);
router.put('/send/:analyticId', controller.send);

module.exports = router;