(function () {
    'use strict';

    module.exports = function (app) {
        app.get('/', function (request, response) {
            response.sendFile('index.html', {root: 'src/client/views/'});
        });

        app.use('/auth', require('./authRoutes')());
    };
})();