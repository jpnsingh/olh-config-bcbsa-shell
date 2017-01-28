(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.controllers.roleController', [])
        .controller('RoleCtrl', RoleCtrl);

    RoleCtrl.$inject = ['Role'];
    function RoleCtrl(Role) {
        var vm = this;

        vm.roles = [];

        vm.roles.push(new Role('PlanAdmin')
            .name('Plan Admin')
            .description('Plan Level Admin')
            .responsibilities({
                canUpdatePlanConfig: true,
                canUpdateRootConfig: false
            }));

        vm.roles.push(new Role('BCBSAAdmin')
            .name('BCBSA Admin')
            .description('Root Admin')
            .responsibilities({
                canUpdatePlanConfig: true,
                canUpdateRootConfig: true
            }));

        vm.roles.push(new Role('SuperUser')
            .name('SuperUser')
            .description('Super User')
            .responsibilities({
                canUpdatePlanConfig: true,
                canUpdateRootConfig: true
            }));

        vm.updateRoles = function () {
            vm.updating = true;
        };

        init();

        vm.addRole = function () {
            vm.roles.unshift(new Role('')
                .name('')
                .description('')
                .responsibilities({
                    canUpdatePlanConfig: false,
                    canUpdateRootConfig: false
                }));
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
