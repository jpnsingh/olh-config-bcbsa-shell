(function () {
    'use strict';

    module.exports = SettingsStateConfig;

    SettingsStateConfig.$inject = ['$stateProvider'];
    function SettingsStateConfig($stateProvider) {
        $stateProvider
            .state(states().settings)
            .state(states().settingsProfile)
            .state(states().settingsAccount);

        function states() {
            return {
                settings: {
                    name: 'settings',
                    url: '/settings',
                    parent: 'nav',
                    abstract: true,
                    template: '<data-ui-view></data-ui-view>'
                },
                settingsProfile: {
                    name: 'settings.profile',
                    url: '/profile',
                    templateUrl: 'templates/partials/settings/profile.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'profileCtrl',
                    data: {
                        docTitle: 'Settings | Profile'
                    }
                },
                settingsAccount: {
                    name: 'settings.account',
                    url: '/account',
                    templateUrl: 'templates/partials/settings/account.html',
                    controller: 'AccountsCtrl',
                    controllerAs: 'accountsCtrl',
                    data: {
                        docTitle: 'Settings | Account'
                    }
                }
            };
        }
    }
})();
