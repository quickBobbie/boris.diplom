const mongoose = require('mongoose');

module.exports.start = config => {
    const connectionLink = `mongodb://${config.host}:${config.port}/${config.name}`;

    mongoose.connect(connectionLink, config.params);

    let database = mongoose.connection;

    database.on('open', () => {
        console.log(`Connect to ${ database.name } database`);
    });
    database.on('error', () => {
        console.log(`${ database.name } connection error`);
    });

    return database;
};