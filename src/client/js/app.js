(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell', [
        'ui.router',
        require('./shared').name,
        require('./auth').name,
        require('./nav').name,
        require('./configuration').name,
        require('./settings').name,
        require('./states').name
    ]);
})();
