(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        app = express(),
        port = process.env.PORT || 3000,
        secret = process.env.SECRET || 'bcbsa-shell-app-secret';

    app.use(express.static('.build/web'));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cookieParser());
    app.use(session({secret: secret, resave: false, saveUninitialized: true}));

    require('./config/passport')(app);

    app.set('views', './src/client/views');
    app.set('view engine', 'html');

    require('./routes')(app);
    app.use(require('./middlewares/error.handler'));

    var server = app.listen(port, function () {
        console.log('Server now listening at port: %s', server.address().port);
    });
})();
