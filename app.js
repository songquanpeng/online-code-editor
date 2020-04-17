'use strict';
const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const compression = require('compression');
const serveStatic = require('serve-static');
const getHostIP = require('./util').getHostIP;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    serveStatic(path.join(__dirname, 'public'), {
        maxAge: '600000'
    })
);
app.use(compression());
app.use('/', routes);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.error(err);
    res.json(err);
});

const server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server address: http://${getHostIP()}:${port}`);