(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.shared.directives', [
        require('./loading.spinner.directive').name,
        require('./image.preview.directive.js').name,
        require('./image.clear.btn.directive.js').name
    ]);
})();
