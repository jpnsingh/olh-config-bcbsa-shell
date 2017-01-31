(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.controllers.roleController', [])
        .controller('RoleCtrl', RoleCtrl);

    RoleCtrl.$inject = ['$timeout', 'auth', 'Role', 'RoleService'];
    function RoleCtrl($timeout, auth, Role, RoleService) {
        var vm = this;

        vm.canModifyRoles = _.some(auth.currentUser().roles, {id: 'SuperUser'});

        vm.loadingRoles = true;

        RoleService
            .listRoles()
            .then(function (data) {
                vm.loadingRoles = false;
                vm.roles = data.roles;
                init();
            }, function (error) {
                vm.loadingRoles = false;
                vm.error = error;
            });

        vm.addRole = function () {
            vm.roles.unshift(new Role('')
                .name('')
                .description(''));
            init();
        };

        vm.deleteRole = function () {
            _.remove(vm.roles, vm.selected);
            init();
        };

        vm.updateRole = function () {
            vm.updating = true;

            $timeout(function () {
                RoleService
                    .updateRole(vm.selected)
                    .then(function (data) {
                        vm.updating = false;
                        vm.selected = data.role;
                    }, function (error) {
                        vm.updating = false;
                        vm.error = error;
                    });
            }, 2000);
        };

        function init() {
            vm.selected = vm.roles[0];
        }
    }
})();
