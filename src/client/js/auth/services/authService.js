(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.auth.services.authService', [])
        .service('AuthService', [
            '$rootScope', '$injector', '$http',
            function ($rootScope, $injector, $http) {
                var self = this;

                function store(user) {
                    $rootScope.user = user;
                    localStorage.user = user;
                    self.setSignedIn(true);
                }

                self.clear = function () {
                    $rootScope.user = user;
                    localStorage.user = '';
                    self.setSignedIn(false);
                };

                self.getSignedIn = function () {
                    return self.signedIn;
                };

                self.setSignedIn = function (signedIn) {
                    self.signedIn = signedIn;
                };

                self.signIn = function (username, password) {
                    return $injector.get('$http')({
                        method: 'POST',
                        url: '/auth/signIn',
                        headers: {
                            //'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        data: {
                            grant_type: 'password',
                            username: username,
                            password: password
                        }
                    }).then(function (response) {
                        // success - user logged in
                        store(response.data.user);
                        $rootScope.$broadcast('signInEvent', response.data.user);
                        return response.data.user;
                    }, function (data) {
                        console.log('Failed to log in');
                        self.clear();
                        $rootScope.$broadcast('authenticationFailed');
                    });
                };

                self.signUp = function (username, password) {
                    return $injector.get('$http')({
                        method: 'POST',
                        url: '/auth/signUp',
                        headers: {
                            //'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        data: {
                            grant_type: 'password',
                            username: username,
                            password: password
                        }
                    }).then(function (response) {
                        // success - user logged in
                        store(response.data.user);
                        $rootScope.$broadcast('signInEvent', response.data.user);
                        return response.data.user;
                    }, function (data) {
                        console.log('Failed to log in');
                        self.clear();
                        $rootScope.$broadcast('authenticationFailed');
                    });
                };
            }
        ]);
})();
