(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.roleService', [])
        .service('RoleService', RoleService);

    RoleService.$inject = ['$http', 'auth'];
    function RoleService($http, auth) {
        var self = this;

        self.listRoles = function () {
            return $http
                .get('api/role/list')
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        };

        self.userRoles = function () {
            return $http
                .get('api/role/userRoles')
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        };

        self.deleteRole = function (roleId) {
            return $http
                .delete('api/role/:roleId'.replace(':roleId', roleId))
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        };

        self.updateRole = function (role) {
            return $http
                .put('api/role/:roleId'.replace(':roleId', role._id ? role._id : 'new'), {
                    role: role,
                    userName: auth.currentUser().auth.userName
                })
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        };
    }
})();
