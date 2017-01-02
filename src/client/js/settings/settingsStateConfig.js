(function () {
    'use strict';

    module.exports = function ($stateProvider) {
        var settings = {
                name: 'settings',
                url: '/settings',
                parent: 'nav',
                abstract: true,
                template: '<data-ui-view></data-ui-view>'
            },
            settingsProfile = {
                name: 'settings.profile',
                url: '/profile',
                templateUrl: 'templates/partials/settings/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'profileCtrl'
            },
            settingsAccount = {
                name: 'settings.account',
                url: '/account',
                templateUrl: 'templates/partials/settings/account.html',
                controller: 'AccountsCtrl',
                controllerAs: 'accountsCtrl'
            };

        $stateProvider
            .state(settings)
            .state(settingsProfile)
            .state(settingsAccount);
    };
})();
