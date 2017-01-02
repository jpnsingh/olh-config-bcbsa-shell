(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.loginController', [])
        .controller('LoginCtrl', [
            '$state', 'AuthService',
            function ($state, AuthService) {
                var vm = this;

                vm.loggedIn = false;

                vm.login = function () {
                    vm.loggingIn = true;

                    AuthService
                        .login(vm.username, vm.password)
                        .then(function (data) {
                            vm.loggingIn = false;
                            console.log(data);
                            $state.go('root');
                        }, function (data) {
                            vm.loggingIn = false;
                            vm.error = data.error;
                        });
                };
            }
        ]);
})();
