(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        app = express(),
        port = process.env.PORT || 3000;

    app.use(express.static('.build/web'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({secret: 'bcbsa-shell'}));

    require('./config/passport')(app);

    app.set('views', './src/client/views');
    app.set('view engine', 'html');

    require('./routes')(app);

    app.listen(port, function () {
        console.log('App now running on port: ' + port);
    });
})();
