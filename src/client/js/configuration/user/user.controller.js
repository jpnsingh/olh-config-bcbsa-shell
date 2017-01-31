(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.user.controllers.userController', [])
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['auth', 'User', 'UserService', 'RoleService', 'ConfigFactory'];
    function UserCtrl(auth, User, UserService, RoleService, ConfigFactory) {
        var vm = this;

        vm.canModifyUsers = _.some(auth.currentUser().roles, {_id: 'SuperUser'});

        vm.loadingUsers = true;

        RoleService
            .getRoles()
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

        vm.updateUsers = function () {
            console.log(vm.users);
            console.log(vm.selected);
        };

        function init() {
            vm.selected = vm.users[0];
        }
    }
})();
