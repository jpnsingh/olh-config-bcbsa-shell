(function () {
    'use strict';

    module.exports = DefaultAppRun;

    DefaultAppRun.$inject = ['$rootScope', '$translate', '$translatePartialLoader', 'languageService'];

    function DefaultAppRun($rootScope, $translate, $translatePartialLoader, languageService) {
        $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
            $translate.refresh();
        });
        languageService.setLanguage();
    }
})();
