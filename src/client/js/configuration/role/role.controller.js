(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.controllers.roleController', [])
        .controller('RoleCtrl', RoleCtrl);

    RoleCtrl.$inject = ['$timeout', 'auth', 'Role', 'RoleService', 'NotificationService'];
    function RoleCtrl($timeout, auth, Role, RoleService, NotificationService) {
        var vm = this;

        vm.canModifyRoles = _.some(auth.currentUser().roles, {id: 'SuperUser'});

        vm.addRole = function () {
            vm.roles.unshift(new Role('')
                .name('')
                .description(''));
            initSelection();
        };

        vm.deleteRole = function () {
            vm.updating = true;

            $timeout(function () {
                RoleService
                    .deleteRole(vm.selected._id)
                    .then(function () {
                        NotificationService.displaySuccess('Role deleted successfully.');
                        vm.updating = false;
                        _.remove(vm.roles, vm.selected);
                        initSelection();
                    }, function (error) {
                        vm.updating = false;
                        vm.error = error;
                        NotificationService.displayError('Error deleting Role.');
                    });
            }, 1000);
        };

        vm.updateRole = function () {
            vm.updating = true;

            $timeout(function () {
                RoleService
                    .updateRole(vm.selected)
                    .then(function () {
                        NotificationService.displaySuccess('Role updated successfully.');
                        vm.updating = false;
                        init();
                    }, function (error) {
                        vm.updating = false;
                        vm.error = error;
                        NotificationService.displayError('Error updating Role.');
                    });
            }, 1000);
        };

        function initSelection() {
            vm.selected = vm.roles[0];
        }

        function init() {
            vm.loadingRoles = true;

            RoleService
                .listRoles()
                .then(function (data) {
                    vm.loadingRoles = false;
                    vm.roles = data.roles;
                    initSelection();
                }, function (error) {
                    vm.loadingRoles = false;
                    vm.error = error;
                });
        }

        init();
    }
})();
