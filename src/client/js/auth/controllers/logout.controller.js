(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.logoutController', [])
        .controller('LogoutCtrl', LogoutCtrl);

    LogoutCtrl.$inject = ['auth', '$state'];
    function LogoutCtrl(auth, $state) {
        auth.logout();
        $state.go('login');
    }
})();
