'use strict';

export function ConfigStateConfig($stateProvider) {
    $stateProvider
        .state(states().configuration);

    function states() {
        return {
            configuration: {
                name: 'configuration',
                url: '/configuration',
                abstract: true,
                parent: 'nav',
                templateUrl: 'templates/partials/configuration/configuration.html',
                controller: 'ConfigCtrl',
                controllerAs: 'configCtrl'
            }
        };
    }
}

ConfigStateConfig.$inject = ['$stateProvider'];
