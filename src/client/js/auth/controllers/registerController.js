(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.registerController', [])
        .controller('RegisterCtrl', [
            '$state', 'AuthService',
            function ($state, AuthService) {
                var vm = this;

                vm.register = function () {
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
                };
            }
        ]);
})();
