(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.user.services.userService', [])
        .service('UserService', UserService);

    UserService.$inject = ['$http', 'auth'];
    function UserService($http, auth) {
        var self = this;

        self.getUsers = function () {
            return $http
                .get('api/user/list')
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response.error;
                });
        };

        self.updateUser = function (user) {
            return $http
                .put('api/user/:userId'.replace(':userId', user._id), {
                    user: user,
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
