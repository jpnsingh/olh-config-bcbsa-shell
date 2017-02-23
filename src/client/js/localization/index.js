(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.localization', [])
        .service('languageInterceptor', require('./languageInterceptor'))
        .service('languageService', require('./languageService'));
})();
