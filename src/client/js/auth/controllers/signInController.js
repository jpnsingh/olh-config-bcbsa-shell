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
                            $state.go('root');
                        }, function (data) {
                            vm.signingIn = false;
                            vm.error = data.error;
                        });
                };
            }
        ]);
})();
