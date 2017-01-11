(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.directives.spinner', [])
        .directive('loadingSpinner', loadingSpinnerDirective);

    function loadingSpinnerDirective() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                loading: '=',
                size: '@'
            },
            templateUrl: 'templates/partials/shared/loading.spinner.html'
        };
    }
})();
