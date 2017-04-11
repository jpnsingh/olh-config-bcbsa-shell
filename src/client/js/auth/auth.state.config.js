'use strict';

export function AuthStateConfig($stateProvider) {
    $stateProvider
        .state(states().login)
        .state(states().logout)
        .state(states().register);

    function states() {
        return {
            login: {
                name: 'login',
                url: '/login',
                parent: 'nonav',
                templateUrl: 'templates/partials/auth/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl',
                data: {
                    docTitle: 'Login'
                }
            },
            logout: {
                name: 'logout',
                url: '/logout',
                parent: 'nonav',
                templateUrl: 'templates/partials/auth/logout.html',
                controller: 'LogoutCtrl',
                controllerAs: 'logoutCtrl',
                data: {
                    docTitle: 'Logout'
                }
            },
            register: {
                name: 'register',
                url: '/register',
                parent: 'nonav',
                templateUrl: 'templates/partials/auth/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'registerCtrl',
                data: {
                    docTitle: 'Register'
                }
            }
        };
    }
}

AuthStateConfig.$inject = ['$stateProvider'];
