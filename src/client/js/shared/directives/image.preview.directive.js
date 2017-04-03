(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.directives.imagePreview', [])
        .directive('imagePreview', imagePreviewDirective);

    function imagePreviewDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                previewModel: '='
            },
            templateUrl: 'templates/partials/shared/image.preview.html'
        };
    }
})();
