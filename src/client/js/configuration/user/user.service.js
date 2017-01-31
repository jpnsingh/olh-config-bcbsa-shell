(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.config.user.services.userService', [])
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
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
    }
})();
