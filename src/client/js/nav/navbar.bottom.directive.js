(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.bottomNavDirective', [])
        .directive('navbarBottom', navbarBottomDirective);

    function navbarBottomDirective() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'templates/partials/nav/navbar.bottom.html'
        };
    }
})();
