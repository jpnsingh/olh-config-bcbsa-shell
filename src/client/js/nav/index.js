(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation', [
        require('./navbarController').name,
        require('./navbarTopDirective').name,
        require('./navbarBottomDirective').name
    ]);
})();
