(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.controllers.navBarController', [])
        .controller('NavBarCtrl', NavBarCtrl);

    NavBarCtrl.$inject = ['$rootScope', '$state'];
    function NavBarCtrl($rootScope, $state) {
        var vm = this;

        vm.user = sessionStorage.user ? JSON.parse(sessionStorage.user) : false;
        vm.loggedIn = !!vm.user;

        vm.nav = {
            top: {
                header: {
                    label: 'BCBSA',
                    stateRef: 'dashboard'
                },
                links: {
                    left: [
                        {label: 'Configuration', stateRef: 'configuration.planSetup'}
                    ],
                    right: [
                        {
                            label: 'User profile and more',
                            icon: {cls: 'fa fa-user fa-lg'},
                            userMenu: true,
                            list: [
                                {
                                    label: 'About',
                                    stateRef: 'about'
                                },
                                {
                                    label: 'Help',
                                    stateRef: 'help'
                                },
                                {
                                    divider: true
                                },
                                {
                                    label: 'Settings',
                                    stateRef: 'settings.profile',
                                    icon: {cls: 'fa fa-cogs fa-lg'}
                                },
                                {
                                    label: 'Logout',
                                    stateRef: 'logout',
                                    icon: {cls: 'fa fa-sign-out fa-lg'}
                                }
                            ]
                        }
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
})();
