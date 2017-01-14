(function () {
    'use strict';

    module.exports = ConfigRoleStateConfig;

    ConfigRoleStateConfig.$inject = ['$stateProvider'];
    function ConfigRoleStateConfig($stateProvider) {
        $stateProvider
            .state(states().role);

        function states() {
            return {
                role: {
                    name: 'configuration.role',
                    url: '/role',
                    templateUrl: 'templates/partials/configuration/config.role.html',
                    data: {
                        docTitle: 'Configuration | Role Management'
                    }
                }
            };
        }
    }
})();
