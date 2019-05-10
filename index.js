const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('./app/app.router');
const config = require('./config');
const database = require('./app/app.database');
const server = require('./app/app.server');
const app = express();

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());
app.use(cors(config.client));
app.use(router);

database.start(config.database);
server.start(app, config.server);