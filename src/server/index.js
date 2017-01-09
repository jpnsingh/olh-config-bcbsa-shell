(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        favicon = require('serve-favicon'),
        app = express(),
        router = express.Router(),
        PROTOCOL = process.env.PROTOCOL || 'http',
        PORT = process.env.PORT || 3000,
        HOST = process.env.HOST || 'localhost',
        SECRET = process.env.SECRET || 'bcbsa-shell-app-secret';

    router.use(favicon('.build/web/images/favicon.png'));

    app.use(express.static('.build/web'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({secret: SECRET, resave: false, saveUninitialized: true}));

    require('./config/passport')(app);

    app.set('views', './src/client/views');
    app.set('view engine', 'html');

    require('./routes')(app);

    var server = app.listen(PORT, HOST, function () {
        console.log('App now running at ' + PROTOCOL + '://' + server.address().address + ':' + server.address().port);
        console.log('host: ' + HOST);
        console.log('env: ' + process.env);
    });
})();
