(function () {
    'use strict';

    module.exports = Routes;

    function Routes(app) {
        require('./api')(app);

        app.all('/*', function (request, response) {
            response.sendFile('index.html', {root: 'src/client/views/'});
        });
    }
})();
