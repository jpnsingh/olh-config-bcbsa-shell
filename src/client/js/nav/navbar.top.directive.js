(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.topNavDirective', [])
        .directive('navbarTop', navbarTopDirective);

    function navbarTopDirective() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'templates/partials/nav/navbar.top.html'
        };
    }
})();
