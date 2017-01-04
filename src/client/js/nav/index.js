(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation', [
        require('./navbar.controller').name,
        require('./navbar.top.directive').name,
        require('./navbar.bottom.directive').name
    ]);
})();
