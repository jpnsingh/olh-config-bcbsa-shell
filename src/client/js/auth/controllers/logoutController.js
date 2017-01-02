(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.logoutController', [])
        .controller('LogoutCtrl', [
            '$state', 'AuthService',
            function ($state, AuthService) {
                var vm = this;

                AuthService.logout();
            }
        ]);
})();
