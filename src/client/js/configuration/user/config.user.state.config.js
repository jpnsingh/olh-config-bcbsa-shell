'use strict';

export function ConfigUserStateConfig($stateProvider) {
    $stateProvider
        .state(states().user);

    function states() {
        return {
            user: {
                name: 'configuration.user',
                url: '/user',
                templateUrl: 'templates/partials/configuration/config.user.html',
                data: {
                    docTitle: 'Configuration | User Management'
                },
                controller: 'UserCtrl',
                controllerAs: 'userCtrl'
            }
        };
    }
}

ConfigUserStateConfig.$inject = ['$stateProvider'];
