(function () {
    'use strict';
    module.exports = function ($stateProvider, $urlRouterProvider) {
        var login = {
                name: 'login',
                url: '/login',
                parent: 'nonav',
                templateUrl: 'templates/partials/auth/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            },
            logout = {
                name: 'logout',
                url: '/logout',
                parent: 'nonav',
                templateUrl: 'templates/partials/auth/logout.html',
                controller: 'LogoutCtrl',
                controllerAs: 'logoutCtrl'
            },
            register = {
                name: 'register',
                url: '/register',
                parent: 'nonav',
                templateUrl: 'templates/partials/auth/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'registerCtrl'
            };

        $stateProvider
            .state(login)
            .state(logout)
            .state(register);
    };
})();
