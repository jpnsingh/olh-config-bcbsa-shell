(function () {
    'use strict';
    module.exports = angular.module('bcbsa-shell.auth.controllers.signOutController', [])
        .controller('SignOutCtrl', [
            '$state', 'authService',
            function ($state, authService) {
                var vm = this;

                authService.setSignedIn(false);

                $state.go('signIn');
            }
        ]);
})();
