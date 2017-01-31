(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.user.controllers.userController', [])
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$timeout', 'auth', 'User', 'UserService', 'RoleService', 'ConfigFactory'];
    function UserCtrl($timeout, auth, User, UserService, RoleService, ConfigFactory) {
        var vm = this;

        vm.canModifyUsers = _.some(auth.currentUser().roles, {id: 'SuperUser'});

        vm.loadingUsers = true;
        vm.updaing = false;

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

        UserService
            .getUsers()
            .then(function (data) {
                vm.loadingUsers = false;
                vm.users = data.users;
                init();
            }, function (error) {
                vm.loadingUsers = false;
                vm.error = error;
            });

        vm.addUser = function () {
            vm.users.unshift(new User());
            init();
        };

        vm.deleteUser = function () {
            _.remove(vm.users, vm.selected);
            init();
        };

        vm.updateUser = function () {
            vm.updaing = true;

            $timeout(function () {
                UserService
                    .updateUser(vm.selected)
                    .then(function (data) {
                        vm.updaing = false;
                        vm.selected = data.user;
                    }, function (error) {
                        vm.updaing = false;
                        vm.error = error;
                    });
            }, 5000);
        };

        function init() {
            vm.selected = vm.users[0];
        }
    }
})();
