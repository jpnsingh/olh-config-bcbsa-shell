(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.user.controllers.userController', [])
        .controller('UserCtrl', UserCtrl);

    /* jshint maxparams:8 */
    UserCtrl.$inject = ['$scope', '$timeout', 'auth', 'User', 'UserService', 'RoleService', 'ConfigService', 'NotificationService'];
    function UserCtrl($scope, $timeout, auth, User, UserService, RoleService, ConfigService, NotificationService) {
        var vm = this;

        init();

        vm.canModifyUsers = _.some(auth.currentUser().roles, {id: 'SuperUser'});

        RoleService
            .userRoles()
            .then(function (data) {
                vm.roles = data.roles;
            });

        ConfigService
            .listGroups()
            .then(function (data) {
                vm.groups = data.groups;
            });

        vm.addUser = function () {
            vm.users.unshift(new User());
            initSelection();
        };

        vm.deleteUser = function () {
            vm.updating = true;

            $timeout(function () {
                UserService
                    .deleteUser(vm.selected._id)
                    .then(function () {
                        NotificationService.displaySuccess('User deleted successfully.');
                        vm.updating = false;
                        _.remove(vm.users, vm.selected);
                        initSelection();
                    }, function (error) {
                        vm.updating = false;
                        vm.error = error;
                        NotificationService.displayError('Error deleting User.');
                    });
            }, 1000);
        };

        vm.updateUser = function () {
            vm.updating = true;

            $timeout(function () {
                UserService
                    .updateUser(vm.selected)
                    .then(function () {
                        NotificationService.displaySuccess('User updated successfully.');
                        vm.updating = false;
                        init();
                    }, function (error) {
                        vm.updating = false;
                        vm.error = error;
                        NotificationService.displayError('Error updating User.');
                    });
            }, 1000);
        };

        function initSelection() {
            vm.selected = vm.users[0];
        }

        function init() {
            vm.users = [];
            vm.loadingUsers = true;

            UserService
                .getUsers()
                .then(function (data) {
                    vm.loadingUsers = false;
                    vm.users = data.users;
                    initSelection();
                }, function (error) {
                    vm.loadingUsers = false;
                    vm.error = error;
                });
        }

        $scope.$watch('userCtrl.users', function (newVal, oldVal) {
            vm.userChanged = !_.isEmpty(oldVal) && !_.isEmpty(newVal) && (newVal !== oldVal);
        }, true);
    }
})();
