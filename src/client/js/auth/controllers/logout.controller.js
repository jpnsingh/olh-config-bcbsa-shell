(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.logoutController', [])
        .controller('LogoutCtrl', LogoutCtrl);

    LogoutCtrl.$inject = ['auth'];
    function LogoutCtrl(auth) {
        var vm = this;

        auth.logout();
    }
})();
