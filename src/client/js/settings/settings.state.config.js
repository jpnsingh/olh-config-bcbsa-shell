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
                    docTitle: 'Settings | Profile',
                    templateUrl: 'templates/partials/settings/profile.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'profileCtrl'
                },
                settingsAccount: {
                    name: 'settings.account',
                    url: '/account',
                    docTitle: 'Settings | Account',
                    templateUrl: 'templates/partials/settings/account.html',
                    controller: 'AccountsCtrl',
                    controllerAs: 'accountsCtrl'
                }
            };
        }
    }
})();
