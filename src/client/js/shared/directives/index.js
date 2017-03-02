(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.shared.directives', [
        require('./loading.spinner.directive').name,
        require('./clear.image.btn.directive').name
    ]);
})();
