(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.controllers.roleController', [])
        .controller('RoleCtrl', RoleCtrl);

    RoleCtrl.$inject = ['auth', 'Role', 'RoleService'];
    function RoleCtrl(auth, Role, RoleService) {
        var vm = this;

        vm.canModifyRoles = _.some(auth.currentUser().roles, {_id: 'SuperUser'});

        vm.loadingRoles = true;

        RoleService
            .getRoles()
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

        function init() {
            vm.selected = vm.roles[0];
        }
    }
})();
