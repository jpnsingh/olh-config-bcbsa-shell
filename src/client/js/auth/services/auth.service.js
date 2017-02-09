(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.services.authService', [
        'ui.router'
    ]).factory('auth', auth);

    auth.$inject = ['$q', '$rootScope', '$http', '$window', '$state'];
    function auth($q, $rootScope, $http, $window, $state) {
        var authService = {};

        authService.clear = clear;
        authService.storeUser = storeUser;
        authService.currentUser = currentUser;
        authService.isAuthenticated = isAuthenticated;
        authService.logout = logout;
        authService.register = register;
        authService.login = login;

        return authService;

        function clear() {
            $window.sessionStorage.user = JSON.stringify({});
        }

        function storeUser(user) {
            $window.sessionStorage.user = user ? JSON.stringify(user) : {};
            $rootScope.$broadcast('loginEvent', user);
            return user;
        }

        function currentUser() {
            return !_.isEmpty($window.sessionStorage.user) ? JSON.parse($window.sessionStorage.user) : {};
        }

        function isAuthenticated() {
            return !_.isEmpty(currentUser());
        }

        function logout() {
            clear();
            $state.go('login');
        }

        function failureEvent(name) {
            console.log('Failed to ' + name);
            clear();
            $rootScope.$broadcast('authenticationFailed');
        }

        function register(user) {
            return $http
                .post('/api/auth/register', user, {})
                .then(function (response) {
                    return storeUser(response.data.user);
                }, function (response) {
                    failureEvent('register');
                    return $q.reject(response.data.error);
                });
        }

        function login(userName, password) {
            var user = {userName: userName, password: password};
            return $http
                .post('/api/auth/login', user, {})
                .then(function (response) {
                    return storeUser(response.data.user);
                }, function (response) {
                    failureEvent('login');
                    return $q.reject(response.data.error);
                });
        }
    }
})();
