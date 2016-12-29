(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.bottomNavDirective', [])
        .directive('navbarBottom', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/partials/navbar-bottom.html',
                controller: 'NavBarCtrl',
                controllerAs: 'navBarCtrl'
            };
        });
})();
