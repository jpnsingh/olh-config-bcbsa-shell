(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth', [
        require('./services').name,
        require('./controllers').name
    ]).config(function ($stateProvider, $urlRouterProvider) {
        var signIn = {
                name: 'signIn',
                url: '/signIn',
                templateUrl: 'templates/partials/auth/sign-in.html',
                controller: 'SignInCtrl',
                controllerAs: 'signInCtrl'
            },
            signOut = {
                name: 'signOut',
                url: '/signOut',
                templateUrl: 'templates/partials/auth/sign-out.html',
                controller: 'SignOutCtrl',
                controllerAs: 'signOutCtrl'
            };

        $stateProvider
            .state(signIn)
            .state(signOut);
    });
})();
