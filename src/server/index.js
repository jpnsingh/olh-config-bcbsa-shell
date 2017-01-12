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

    function errorHandler(err, req, res/*, next*/) {
        console.error(err.message);
        console.error(err.stack);
        res.status(500).json({error: err});
    }

    app.use(errorHandler);

    var server = app.listen(port, function () {
        console.log('Server now listening at port: %s', server.address().port);
    });
})();
