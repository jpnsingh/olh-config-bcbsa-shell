(function () {
    'use strict';

    module.exports = AppRunFn;

    AppRunFn.$inject = ['$rootScope', '$translate', '$translatePartialLoader', 'languageService'];

    function AppRunFn($rootScope, $translate, $translatePartialLoader, languageService) {
        $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
            $translate.refresh();
        });
        languageService.setLanguage();
    }
})();
