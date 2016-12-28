(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.bcbsaNavDirective', [])
        .directive('bcbsaNav', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/partials/navbar.html',
                link: function (scope) {
                    scope.state = true;
                }
            };
        });
})();
