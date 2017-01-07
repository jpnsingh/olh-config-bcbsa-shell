(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        favicon = require('serve-favicon'),
        config = require('config'),
        app = express(),
        router = express.Router();

    router.use(favicon('.build/web/images/favicon.png'));

    app.use(express.static('.build/web'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));

    require('./config/passport')(app);

    app.set('views', './src/client/views');
    app.set('view engine', 'html');

    require('./routes')(app);

    var server = app.listen(config.web.port, config.web.host, function () {
        console.log('App now running at http://' + server.address().address + ':' + server.address().port);
    });
})();
