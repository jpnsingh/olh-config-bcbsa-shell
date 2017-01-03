(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.services.authService', [])
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$rootScope', '$injector', '$http', '$state'];
    function AuthService($rootScope, $injector, $http, $state) {
        var service = {};

        service.clear = clear;
        service.getLoggedIn = getLoggedIn;
        service.setLoggedIn = setLoggedIn;
        service.register = register;
        service.login = login;
        service.logout = logout;

        return service;

        function store(user) {
            $rootScope.user = user;
            sessionStorage.user = JSON.stringify(user);
            setLoggedIn(true);
        }

        function clear() {
            $rootScope.user = '';
            sessionStorage.user = '';
            setLoggedIn(false);
        }

        function getLoggedIn() {
            return service.loggedIn;
        }

        function setLoggedIn(loggedIn) {
            service.loggedIn = loggedIn;
        }

        function register(username, password) {
            return $injector.get('$http')({
                method: 'POST',
                url: '/auth/register',
                headers: {
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    grantType: 'password',
                    username: username,
                    password: password
                }
            }).then(function (response) {
                // success - user logged in
                store(response.data.user);
                $rootScope.$broadcast('loginEvent', response.data.user);
                return response.data.user;
            }, function (data) {
                console.log('Failed to register');
                clear();
                $rootScope.$broadcast('authenticationFailed');
            });
        }

        function login(username, password) {
            return $injector.get('$http')({
                method: 'POST',
                url: '/auth/login',
                headers: {
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    grantType: 'password',
                    username: username,
                    password: password
                }
            }).then(function (response) {
                // success - user logged in
                store(response.data.user);
                $rootScope.$broadcast('loginEvent', response.data.user);
                return response.data.user;
            }, function (data) {
                console.log('Failed to log in');
                clear();
                $rootScope.$broadcast('authenticationFailed');
            });
        }

        function logout() {
            clear();
            $state.go('login');
        }
    }
})();
