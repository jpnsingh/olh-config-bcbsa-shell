(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.controllers.navBarController', [])
        .controller('NavBarCtrl', function () {
            var vm = this;

            vm.signedIn = true;
        });
})();
