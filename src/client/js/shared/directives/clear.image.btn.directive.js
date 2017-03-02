(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.directives.clearImageButton', [])
        .directive('clearImageButton', clearImageButtonDirective);

    function clearImageButtonDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                imageModel: '='
            },
            templateUrl: 'templates/partials/shared/clear.image.button.html',
            link: link
        };

        function link(scope/*, element, attrs, ctrl*/) {
            scope.clear = clear;

            function clear(model) {
                console.log('clearing image from directive...');
                model.value = '';
                model.src = '';
            }
        }
    }
})();
