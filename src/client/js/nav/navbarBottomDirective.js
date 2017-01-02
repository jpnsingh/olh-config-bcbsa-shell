(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.bottomNavDirective', [])
        .directive('navbarBottom', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/partials/nav/navbar-bottom.html'
            };
        });
})();
