(function () {
    'use strict';

    module.exports = ConfigUserStateConfig;

    ConfigUserStateConfig.$inject = ['$stateProvider'];
    function ConfigUserStateConfig($stateProvider) {
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
})();
