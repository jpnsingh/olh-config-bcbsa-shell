(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.controllers.navBarController', [])
        .controller('NavBarCtrl', NavBarCtrl);

    NavBarCtrl.$inject = ['$window'];
    function NavBarCtrl($window) {
        var vm = this;

        vm.user = !_.isEmpty($window.sessionStorage.user) ? JSON.parse($window.sessionStorage.user) : {};
        vm.loggedIn = !_.isEmpty(vm.user);
        vm.displayName = displayName(vm.user);

        vm.nav = {
            top: {
                header: {
                    label: 'Blue Cross Blue Shield',
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

        function displayName(user) {
            var name = '';

            if (user.lastname) {
                name += user.lastname;
                if (user.firstname) {
                    name += ', ' + user.firstname;
                }
            } else if (user.firstname) {
                name += user.firstname;
            } else {
                name += user.username;
            }

            return name;
        }
    }
})();
