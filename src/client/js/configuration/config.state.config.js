(function () {
    'use strict';

    module.exports = ConfigStateConfig;

    ConfigStateConfig.$inject = ['$stateProvider'];
    function ConfigStateConfig($stateProvider) {
        $stateProvider
            .state(states().configuration)
            .state(states().roles)
            .state(states().users)
            .state(states().reports);

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
                },
                roles: {
                    name: 'configuration.role',
                    url: '/role',
                    templateUrl: 'templates/partials/configuration/config.role.html',
                    data: {
                        docTitle: 'Configuration | Role Management'
                    }
                },
                users: {
                    name: 'configuration.user',
                    url: '/user',
                    templateUrl: 'templates/partials/configuration/config.user.html',
                    data: {
                        docTitle: 'Configuration | User Management'
                    }
                },
                reports: {
                    name: 'configuration.report',
                    url: '/report',
                    templateUrl: 'templates/partials/configuration/config.report.html',
                    data: {
                        docTitle: 'Configuration | Reports'
                    }
                }
            };
        }
    }
})();
