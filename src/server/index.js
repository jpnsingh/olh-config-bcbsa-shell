(function () {
    'use strict';

    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        app = express(),
        port = 5000;

    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
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
