'use strict';

export class RoleService{
    constructor($http, auth){
        this.$http = $http;
        this.auth = auth;
    }

    listRoles () {
        return this.$http
            .get('api/role/list')
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    };

    userRoles () {
        return this.$http
            .get('api/role/userRoles')
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    };

    deleteRole (roleId) {
        return this.$http
            .delete(`api/role/${roleId}`)
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    };

    updateRole (role) {
        return this.$http
            .put(`api/role/${role._id || 'new'}`, {
                role: role,
                userName: this.auth.currentUser().auth.userName
            })
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    };
}

RoleService.$inject = ['$http', 'auth'];
