(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.upload', [
        'ngFileUpload',
        require('./image.upload.service.js').name
    ]);
})();
