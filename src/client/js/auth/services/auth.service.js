(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.services.authService', [])
        .factory('auth', auth);

    auth.$inject = ['$rootScope', '$injector', '$http', '$state', '$window'];
    function auth($rootScope, $injector, $http, $state, $window) {
        var service = {};

        service.clear = clear;
        service.getLoggedIn = getLoggedIn;
        service.setLoggedIn = setLoggedIn;
        service.register = register;
        service.login = login;
        service.isAuthenticated = isAuthenticated;
        service.logout = logout;

        return service;

        function store(user) {
            $rootScope.user = user;
            $window.sessionStorage.user = JSON.stringify(user);
            setLoggedIn(true);
        }

        function clear() {
            $rootScope.user = '';
            $window.sessionStorage.user = '';
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
            }, function () {
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
            }, function () {
                console.log('Failed to log in');
                clear();
                $rootScope.$broadcast('authenticationFailed');
            });
        }

        function isAuthenticated() {
            var user = $window.sessionStorage.user;

            return !!user;
        }

        function logout() {
            clear();
            $state.go('login');
        }
    }
})();
