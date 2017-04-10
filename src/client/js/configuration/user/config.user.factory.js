(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.user.services', [])
        .factory('User', User);

    function User() {
        var User = function () {
            this.auth = {};
            this.auth.userName = '';
            this.auth.password = '';
            this.auth.grantType = '';
            this.firstName = '';
            this.lastName = '';
            this.dob = '';
            this.email = '';
            this.createdAt = new Date();
            this.updatedAt = new Date();
            this.roles = [];
            this.groups = [];
        };

        return User;
    }
})();
