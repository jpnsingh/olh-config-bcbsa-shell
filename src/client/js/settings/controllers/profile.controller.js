(function () {
    'use strict';

    module.exports = angular.module('bsbsa-shell.settings.controllers.profileController', [])
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl() {
        var vm = this;

        vm.header = 'Profile Settings';
    }
})();
