'use strict';

export function DefaultAppRun($rootScope, $translate, $translatePartialLoader, languageService) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh();
    });
    languageService.setLanguage();
}

DefaultAppRun.$inject = ['$rootScope', '$translate', '$translatePartialLoader', 'languageService'];
