(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        favicon = require('serve-favicon'),
        app = express(),
        router = express.Router(),
        protocol = process.env.protocol || 'http',
        host = process.env.host || 'localhost',
        port = process.env.port || 8090,
        secret = process.env.secret || 'bcbsa-shell-app-secret';

    router.use(favicon('.build/web/images/favicon.png'));

    app.use(express.static('.build/web'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({secret: secret, resave: false, saveUninitialized: true}));

    require('./config/passport')(app);

    app.set('views', './src/client/views');
    app.set('view engine', 'html');

    require('./routes')(app);

    app.listen(port, host, function () {
        console.log('App now running at ' + protocol + '://' + host + ':' + port);
    });
})();
