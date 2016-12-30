(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.controllers.navBarController', [])
        .controller('NavBarCtrl', function () {
            var vm = this;

            vm.signedIn = true;

            vm.nav = {
                header: {
                    label: 'BCBSA',
                    stateRef: 'root'
                },
                links: {
                    left: [
                        {label: 'Configuration', stateRef: 'configuration'}
                    ],
                    right: [
                        {label: 'About', stateRef: 'about'},
                        {label: 'Help', stateRef: 'help'},
                        {label: 'Settings', stateRef: 'settings', icon: {cls: 'fa fa-cogs fa-lg'}}
                    ]
                }
            };

            vm.copyrightYear = new Date().getFullYear();
        });
})();
