'use strict';
const debug = require('debug');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/existingFile", function (req, res) {
    var responceText = '';
    const targetDir = process.cwd() + '/public/data';
    console.log("Taregt dir: " + targetDir);
    fs.readdir(targetDir, (err, files) => {
        files.forEach(file => {
            const temp = file + '\n';
            responceText += temp;
        });
        res.send(responceText);
    });
});


app.post('/getFile', function (req, res) {
    const targetDir = process.cwd() + '/public/data/';
    const targetFile = targetDir + req.body.filename;
    fs.readFile(targetFile, 'utf-8', function (err, data) {
        if (err) {
        } else {
            res.send(data);
        }
    })
});


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 3001);


const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
