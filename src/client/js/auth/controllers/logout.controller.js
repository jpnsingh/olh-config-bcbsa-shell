(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.logoutController', [])
        .controller('LogoutCtrl', LogoutCtrl);

    LogoutCtrl.$inject = ['AuthService'];
    function LogoutCtrl(AuthService) {
        var vm = this;

        AuthService.logout();
    }
})();
