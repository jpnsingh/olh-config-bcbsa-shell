(function () {
    'use strict';

    module.exports = angular.module('bsbsa-shell.settings.controllers.profileController', [])
        .controller('ProfileCtrl', function () {
            var vm = this;

            vm.header = 'Profile Settings';
        });
})();
