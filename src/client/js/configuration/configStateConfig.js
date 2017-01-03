(function () {
    'use strict';

    module.exports = configStateConfig;

    configStateConfig.$inject = ['$stateProvider'];
    function configStateConfig($stateProvider) {
        var configuration = {
            name: 'configuration',
            url: '/configuration',
            docTitle: 'Configuration',
            parent: 'nav',
            templateUrl: 'templates/partials/configuration/configuration.html',
            controller: 'ConfigCtrl',
            controllerAs: 'configCtrl'
        };

        $stateProvider
            .state(configuration);
    }
})();
