'use strict';

export function LoadingSpinnerDirective() {
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

LoadingSpinnerDirective.$inject = [];
