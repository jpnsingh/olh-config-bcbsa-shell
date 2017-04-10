(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.controllers.roleController', [])
        .controller('RoleCtrl', RoleCtrl);

    /* jshint maxparams: 7 */
    RoleCtrl.$inject = ['$scope', '$filter', 'auth', 'Role', 'RoleService', 'NotificationService'];
    function RoleCtrl($scope, $filter, auth, Role, RoleService, NotificationService) {
        var vm = this;

        init();

        vm.canModifyRoles = _.some(auth.currentUser().roles, {id: 'SuperUser'});

        vm.addRole = function () {
            vm.roles.unshift(new Role('')
                .name('')
                .description(''));
            initSelection();
        };

        vm.deleteRole = function () {
            vm.updating = true;

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
        };

        vm.updateRole = function () {
            vm.updating = true;

            RoleService
                .updateRole(vm.selected)
                .then(function () {
                    NotificationService.displaySuccess('Role updated successfully.');
                    vm.updating = false;
                    vm.editing = false;
                }, function (error) {
                    vm.updating = false;
                    vm.editing = false;
                    vm.error = error;
                    NotificationService.displayError('Error updating Role.');
                });
        };

        function initSelection() {
            vm.selected = vm.roles[0];
        }

        function init() {
            vm.roles = [];
            vm.loading = true;

            RoleService
                .listRoles()
                .then(function (data) {
                    vm.loading = false;
                    vm.roles = $filter('orderBy')(data.roles, 'priority');
                    initSelection();
                }, function (error) {
                    vm.loading = false;
                    vm.error = error;
                });
        }

        $scope.$watch('roleCtrl.roles', function (newVal, oldVal) {
            vm.editing = !_.isEmpty(oldVal) && !_.isEmpty(newVal) && (newVal !== oldVal);
        }, true);
    }
})();
