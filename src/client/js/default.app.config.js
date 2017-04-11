'use strict';

export function DefaultAppConfig($httpProvider, $translateProvider, $translatePartialLoaderProvider) {
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

DefaultAppConfig.$inject = ['$httpProvider', '$translateProvider', '$translatePartialLoaderProvider'];
