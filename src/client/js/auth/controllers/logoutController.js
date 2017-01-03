(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.logoutController', [])
        .controller('LogoutCtrl', LogoutCtrl);

    LogoutCtrl.$inject = ['$state', 'AuthService'];
    function LogoutCtrl($state, AuthService) {
        var vm = this;

        AuthService.logout();
    }
})();
