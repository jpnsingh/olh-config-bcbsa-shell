'use strict';

export class UserService {
    constructor($http, auth) {
        this.$http = $http;
        this.auth = auth;
    }

    getUsers() {
        return this.$http
            .get('api/user/list')
            .then((response) => {
                return response.data;
            }, (response) => {
                return response.error;
            });
    }

    getUserGroups() {
        return this.$http
            .get(`api/user/${this.auth.currentUser()._id}/groups`)
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    }

    deleteUser(userId) {
        return this.$http
            .delete(`api/user/${userId}`)
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    }

    updateUser(user) {
        return this.$http
            .put(`api/user/${user._id || 'new'}`, {
                user: user,
                userName: this.auth.currentUser().auth.userName
            })
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.error;
            });
    }
}

UserService.$inject = ['$http', 'auth'];
