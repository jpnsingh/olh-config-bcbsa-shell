(function () {
    'use strict';
    module.exports = AuthStateConfig;

    AuthStateConfig.$inject = ['$stateProvider'];
    function AuthStateConfig($stateProvider) {
        $stateProvider
            .state(states().login)
            .state(states().logout)
            .state(states().register);

        function states() {
            return {
                login: {
                    name: 'login',
                    url: '/login',
                    docTitle: 'Login',
                    parent: 'nonav',
                    templateUrl: 'templates/partials/auth/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'loginCtrl'
                },
                logout: {
                    name: 'logout',
                    url: '/logout',
                    docTitle: 'Logout',
                    parent: 'nonav',
                    templateUrl: 'templates/partials/auth/logout.html',
                    controller: 'LogoutCtrl',
                    controllerAs: 'logoutCtrl'
                },
                register: {
                    name: 'register',
                    url: '/register',
                    docTitle: 'Register',
                    parent: 'nonav',
                    templateUrl: 'templates/partials/auth/register.html',
                    controller: 'RegisterCtrl',
                    controllerAs: 'registerCtrl'
                }
            };
        }
    }
})();
