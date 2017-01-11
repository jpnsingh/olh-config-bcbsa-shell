(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.registerController', [])
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$state', 'auth'];
    function RegisterCtrl($state, auth) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.registering = true;

            auth
                .register(vm.user)
                .then(function () {
                    vm.registering = false;
                    $state.go('dashboard');
                }, function (data) {
                    vm.registering = false;
                    vm.error = data.error;
                });
        }
    }
})();
