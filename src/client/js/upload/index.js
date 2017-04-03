(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.upload', [
        'ngFileUpload',
        require('./file.upload.service').name,
        require('./image.upload.directive.js').name
    ]);
})();
