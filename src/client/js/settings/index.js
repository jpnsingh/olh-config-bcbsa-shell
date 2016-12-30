(function () {
    'use strict';

    module.exports = angular.module('bsbsa-shell.settings', [
        require('./controllers').name
    ]).config(function ($stateProvider, $urlRouterProvider) {
        var settings = {
                name: 'settings',
                url: '/settings',
                templateUrl: 'templates/partials/settings/settings.html',
                controller: 'SettingsCtrl',
                controllerAs: 'settingsCtrl'
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

        $urlRouterProvider.otherwise('/settings/account');
    });
})();
