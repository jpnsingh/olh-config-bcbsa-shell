(function () {
    'use strict';

    module.exports = DefaultAppConfig;

    DefaultAppConfig.$inject = ['$httpProvider', '$translateProvider', '$translatePartialLoaderProvider'];
    function DefaultAppConfig($httpProvider, $translateProvider, $translatePartialLoaderProvider) {
        $httpProvider.interceptors.push('languageInterceptor');

        $translatePartialLoaderProvider
            .addPart('bcbsa-shell');

        $translateProvider
            .useLoader('$translatePartialLoader', {
                urlTemplate: '/i18n/{part}.{lang}.json'
            })
            .preferredLanguage('en')
            .fallbackLanguage('en');
    }
})();
