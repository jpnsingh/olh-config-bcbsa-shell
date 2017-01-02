(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.signInController', [])
        .controller('SignInCtrl', [
            '$state', 'AuthService',
            function ($state, AuthService) {
                var vm = this;

                vm.signedIn = false;

                vm.signIn = function (usename, password) {
                    vm.signingIn = true;

                    AuthService
                        .signIn(usename, password)
                        .then(function (data) {
                            vm.signingIn = false;
                            console.log(data);
                            $state.go('root');
                        }, function (data) {
                            vm.signingIn = false;
                            vm.error = data.error;
                        });
                };

                vm.signUp = function (usename, password) {
                    vm.signingUp = true;

                    AuthService
                        .signUp(usename, password)
                        .then(function (data) {
                            vm.signingUp = false;
                            console.log(data);
                            $state.go('root');
                        }, function (data) {
                            vm.signingIn = false;
                            vm.error = data.error;
                        });
                };
            }
        ]);
})();
