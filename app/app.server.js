const http = require('http');

module.exports.start = (app, config) => {
    let port = process.env.PORT || config.port;

    http.createServer(app)
        .listen(port, () => {
            console.log('Server started on port', port);
        })
};