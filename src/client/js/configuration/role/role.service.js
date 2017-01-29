(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.role.roleService', [])
        .service('RoleService', RoleService);

    RoleService.$inject = ['$http'];
    function RoleService($http) {
        var self = this;

        self.getRoles = function () {
            return $http
                .get('api/role/roles')
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        };
    }
})();