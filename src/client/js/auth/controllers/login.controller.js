(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.loginController', [])
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'auth'];
    function LoginCtrl($state, auth) {
        var vm = this;

        vm.loggedIn = false;
        vm.login = login;

        function login() {
            vm.loggingIn = true;

            auth
                .login(vm.userName, vm.password)
                .then(function () {
                    vm.loggingIn = false;
                    $state.go('dashboard');
                }, function (data) {
                    vm.loggingIn = false;
                    vm.error = data.error;
                });
        }
    }
})();
