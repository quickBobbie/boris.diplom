const multer = require('multer');
const path = require('path');
const router = require('express').Router();
const controller = require('./material.controller');
const upload = multer({dest: path.join(__dirname, "../../..", "private")});

router.post('/upload/', upload.single("material"), controller.upload);
router.get('/download/:materialId', controller.download);

module.exports = router;