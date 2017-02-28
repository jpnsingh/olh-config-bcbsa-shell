(function () {
    'use strict';

    module.exports = AppConfigFn;

    AppConfigFn.$inject = ['$httpProvider', '$translateProvider', '$translatePartialLoaderProvider'];
    function AppConfigFn($httpProvider, $translateProvider, $translatePartialLoaderProvider) {
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
