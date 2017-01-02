(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.controllers.navBarController', [])
        .controller('NavBarCtrl', [
            '$rootScope', '$state',
            function ($rootScope, $state) {
                var vm = this;

                vm.user = sessionStorage.user ? JSON.parse(sessionStorage.user) : false;
                vm.loggedIn = !!vm.user;

                vm.nav = {
                    top: {
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
                                {label: 'Settings', stateRef: 'settings.profile', icon: {cls: 'fa fa-cogs fa-lg'}},
                                {label: 'Logout', stateRef: 'logout', icon: {cls: 'fa fa-sign-out fa-lg'}}
                            ]
                        }
                    },
                    bottom: {
                        copyrightYear: new Date().getFullYear()
                    }
                };

                if (!vm.loggedIn) {
                    $state.go('logout');
                }
            }
        ]);
})();
