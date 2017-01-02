(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.topNavDirective', [])
        .directive('navbarTop', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/partials/nav/navbar-top.html'
            };
        });
})();
