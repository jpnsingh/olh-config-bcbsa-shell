(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.loginController', [])
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'AuthService'];
    function LoginCtrl($state, AuthService) {
        var vm = this;

        vm.loggedIn = false;
        vm.login = login;

        function login() {
            vm.loggingIn = true;

            AuthService
                .login(vm.username, vm.password)
                .then(function (data) {
                    vm.loggingIn = false;
                    $state.go('dashboard');
                }, function (data) {
                    vm.loggingIn = false;
                    vm.error = data.error;
                });
        }
    }
})();
