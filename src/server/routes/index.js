(function () {
    'use strict';

    module.exports = Routes;

    function Routes(app) {
        app.use('/auth', require('./auth.routes')());

        app.all('/*', function (request, response) {
            response.sendFile('index.html', {root: 'src/client/views/'});
        });
    }
})();
