(function () {
    'use strict';

    module.exports = angular
        .module('bcbsa-shell', [
            'ui.router',
            'pascalprecht.translate',
            require('./shared').name,
            require('./auth').name,
            require('./nav').name,
            require('./configuration').name,
            require('./localization').name,
            require('./upload').name,
            require('./settings').name,
            require('./states').name
        ])
        .config(require('./default.app.config.js'))
        .run(require('./default.app.run.js'));
})();
