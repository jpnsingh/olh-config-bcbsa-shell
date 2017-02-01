(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.user.controllers.userController', [])
        .controller('UserCtrl', UserCtrl);

    /* jshint maxparams:6 */
    UserCtrl.$inject = ['$timeout', 'auth', 'User', 'UserService', 'RoleService', 'ConfigFactory'];
    function UserCtrl($timeout, auth, User, UserService, RoleService, ConfigFactory) {
        var vm = this;

        vm.canModifyUsers = _.some(auth.currentUser().roles, {id: 'SuperUser'});

        RoleService
            .userRoles()
            .then(function (data) {
                vm.roles = data.roles;
            });

        ConfigFactory
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
                        vm.updating = false;
                        _.remove(vm.users, vm.selected);
                        initSelection();
                    }, function () {

                    });
            }, 2000);
        };

        vm.updateUser = function () {
            vm.updating = true;

            $timeout(function () {
                UserService
                    .updateUser(vm.selected)
                    .then(function () {
                        vm.updating = false;
                        init();
                    }, function (error) {
                        vm.updating = false;
                        vm.error = error;
                    });
            }, 2000);
        };

        function initSelection() {
            vm.selected = vm.users[0];
        }

        function init() {
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

        init();
    }
})();
