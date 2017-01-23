(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell', [
        'ui.router',
        require('./shared').name,
        require('./user').name,
        require('./auth').name,
        require('./nav').name,
        require('./configuration').name,
        require('./upload').name,
        require('./settings').name,
        require('./states').name
    ]);
})();
