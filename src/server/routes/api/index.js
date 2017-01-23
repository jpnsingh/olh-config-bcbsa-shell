(function () {
    'use strict';

    module.exports = ApiRoutes;

    function ApiRoutes(app) {
        app.use('/api/auth', require('./auth.api.routes.js')());

        app.use('/api/config', require('./config.api.routes.js')());

        app.use('/api/upload', require('./upload.api.routes.js')());
    }
})();
