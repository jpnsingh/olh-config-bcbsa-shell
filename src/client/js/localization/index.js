(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.localization', [])
        .service('languageInterceptor', require('./language.interceptor'))
        .service('languageService', require('./language.service'));
})();
