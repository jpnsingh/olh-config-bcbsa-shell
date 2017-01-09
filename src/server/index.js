(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        favicon = require('serve-favicon'),
        app = express(),
        router = express.Router(),
        port = process.env.PORT || 3000,
        secret = process.env.SECRET || 'bcbsa-shell-app-secret';

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

    var server = app.listen(port, function () {
        console.log('Server now listening at port: %s', server.address().port);
        console.log('\n');
        console.log('env: %s', JSON.stringify(process.env));
        console.log('\n');
        console.log('config: %s', JSON.stringify(require('config')));
    });
})();
