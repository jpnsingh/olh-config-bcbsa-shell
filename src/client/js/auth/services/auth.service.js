(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.services.authService', [])
        .factory('auth', auth);

    auth.$inject = ['$rootScope', '$injector', '$state', '$window'];
    function auth($rootScope, $injector, $state, $window) {
        var service = {};

        service.clear = clear;
        service.storeUser = storeUser;
        service.currentUser = currentUser;
        service.isAuthenticated = isAuthenticated;
        service.logout = logout;
        service.register = register;
        service.login = login;

        return service;

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
            console.log('Failed to %s', name);
            clear();
            $rootScope.$broadcast('authenticationFailed');
        }

        function register(username, password) {
            return $injector.get('$http')({
                method: 'POST',
                url: '/auth/register',
                headers: {},
                data: {
                    grantType: 'password',
                    username: username,
                    password: password
                }
            }).then(function (response) {
                return storeUser(response.data.user);
            }, function () {
                failureEvent('login');
            });
        }

        function login(username, password) {
            return $injector.get('$http')({
                method: 'POST',
                url: '/auth/login',
                headers: {},
                data: {
                    grantType: 'password',
                    username: username,
                    password: password
                }
            }).then(function (response) {
                return storeUser(response.data.user);
            }, function () {
                failureEvent('register');
            });
        }
    }
})();
