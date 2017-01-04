(function () {
    'use strict';

    module.exports = angular.module('bsbsa-shell.settings.controllers.accountsController', [])
        .controller('AccountsCtrl', AccountsCtrl);

    function AccountsCtrl() {
        var vm = this;

        vm.header = 'Account Settings';
    }
})();
