(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation', [
        require('./navBarController').name,
        require('./navbarTopDirective').name,
        require('./navbarBottomDirective').name
    ]);
})();
