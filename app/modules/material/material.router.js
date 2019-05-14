const multer = require('multer');
const path = require('path');
const router = require('express').Router();
const controller = require('./material.controller');
const upload = multer({dest: path.join(__dirname, "../../..", "private")});

const privateRoutes = () => {
    router.post('/upload/', upload.single("material"), controller.upload);
    router.get('/download/:materialId', controller.download);
    return router;
};

const publicRoutes = () => {
    router.get('/', controller.get);

    return router;
};

module.exports = {
    private: privateRoutes(),
    public: publicRoutes()
};