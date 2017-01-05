(function () {
    'use strict';

    module.exports = function (app) {
        app.use('/auth', require('./auth.routes')());

        app.all('/*', function (request, response) {
            response.sendFile('index.html', {root: 'src/client/views/'});
        });
    };
})();