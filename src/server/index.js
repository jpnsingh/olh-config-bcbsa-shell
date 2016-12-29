(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        app = express(),
        port = process.env.PORT || 3000;

    app.use(express.static('.build/web'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());

    app.set('views', './src/client/views');
    app.set('view engine', 'html');

    app.get('/', function (request, response) {
        response.sendFile('index.html', {root: 'src/client/views/'});
    });

    app.listen(port, function (error) {
        console.log('Server running on port: ' + port);
    });
})();
