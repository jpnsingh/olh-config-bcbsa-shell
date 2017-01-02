(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.services.authService', [])
        .service('AuthService', [
            '$rootScope', '$injector', '$http', '$state',
            function ($rootScope, $injector, $http, $state) {
                var self = this;

                function store(user) {
                    $rootScope.user = user;
                    sessionStorage.user = JSON.stringify(user);
                    self.setLoggedIn(true);
                }

                self.clear = function () {
                    $rootScope.user = '';
                    sessionStorage.user = '';
                    self.setLoggedIn(false);
                };

                self.getLoggedIn = function () {
                    return self.loggedIn;
                };

                self.setLoggedIn = function (loggedIn) {
                    self.loggedIn = loggedIn;
                };

                self.register = function (username, password) {
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
                        self.clear();
                        $rootScope.$broadcast('authenticationFailed');
                    });
                };

                self.login = function (username, password) {
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
                        self.clear();
                        $rootScope.$broadcast('authenticationFailed');
                    });
                };

                self.logout = function () {
                    self.clear();
                    $state.go('login');
                };
            }
        ]);
})();
