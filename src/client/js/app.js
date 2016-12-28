(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell', [
        'ui.router',
        require('./shared').name,
        require('./nav').name,
        require('./states').name
    ]);
})();
