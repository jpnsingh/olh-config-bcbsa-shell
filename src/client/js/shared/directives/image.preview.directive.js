'use strict';

export function ImagePreviewDirective() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            previewModel: '='
        },
        templateUrl: 'templates/partials/shared/image.preview.html'
    };
}

ImagePreviewDirective.$inject = [];
