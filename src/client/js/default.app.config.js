(function () {
    'use strict';

    module.exports = AppConfigFn;

    AppConfigFn.$inject = ['$translateProvider', '$translatePartialLoaderProvider'];
    function AppConfigFn($translateProvider, $translatePartialLoaderProvider) {
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
