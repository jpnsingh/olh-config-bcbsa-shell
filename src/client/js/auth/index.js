(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth', [
        require('./services').name,
        require('./controllers').name
    ]).config(function ($stateProvider, $urlRouterProvider) {
        var login = {
                name: 'login',
                url: '/login',
                templateUrl: 'templates/partials/auth/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            },
            logout = {
                name: 'logout',
                url: '/logout',
                templateUrl: 'templates/partials/auth/logout.html',
                controller: 'LogoutCtrl',
                controllerAs: 'logoutCtrl'
            },
            register = {
                name: 'register',
                url: '/register',
                templateUrl: 'templates/partials/auth/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'registerCtrl'
            };

        $stateProvider
            .state(login)
            .state(logout)
            .state(register);
    });
})();
