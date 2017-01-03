(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.registerController', [])
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$state', 'AuthService'];
    function RegisterCtrl($state, AuthService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.registering = true;

            AuthService
                .register(vm.username, vm.password)
                .then(function (data) {
                    vm.registering = false;
                    console.log(data);
                    $state.go('root');
                }, function (data) {
                    vm.registering = false;
                    vm.error = data.error;
                });
        }
    }
})();
