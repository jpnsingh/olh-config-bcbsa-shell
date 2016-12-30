(function () {
    'use strict';

    module.exports = angular.module('bsbsa-shell.settings.controllers.settingsController', [])
        .controller('SettingsCtrl', function () {
            var vm = this;

            vm.texts = {
                header: 'Settings',
                account: 'Account',
                profile: 'Profile'
            };
        });
})();
