'use strict';

export function ImageClearDirective() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            imageModel: '='
        },
        templateUrl: 'templates/partials/shared/image.clear.btn.html',
        link: link
    };

    function link(scope/*, element, attrs, ctrl*/) {
        scope.clear = clear;

        function clear(model) {
            model.value = '';
            model.src = '';
        }
    }
}

ImageClearDirective.$inject = [];
