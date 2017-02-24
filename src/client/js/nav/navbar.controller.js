(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.controllers.navBarController', [])
        .controller('NavBarCtrl', NavBarCtrl);

    NavBarCtrl.$inject = ['$window'];
    function NavBarCtrl($window) {
        var vm = this;

        vm.user = !_.isEmpty($window.sessionStorage.user) ? JSON.parse($window.sessionStorage.user) : {};
        vm.loggedIn = !_.isEmpty(vm.user);
        vm.displayName = vm.loggedIn ? displayName(vm.user) : '';

        vm.nav = {
            top: {
                header: {
                    label: 'navbar.header',
                    stateRef: 'dashboard'
                },
                links: {
                    left: [
                        {label: 'navbar.configurationText', stateRef: 'configuration.role', activeState: 'configuration'}
                    ],
                    right: [
                        {
                            label: 'navbar.userProfileText',
                            icon: {cls: 'fa fa-user fa-lg'},
                            userMenu: true,
                            list: [
                                {
                                    label: 'navbar.aboutText',
                                    stateRef: 'about'
                                },
                                {
                                    label: 'navbar.helpText',
                                    stateRef: 'help'
                                },
                                {
                                    divider: true
                                },
                                {
                                    label: 'navbar.settingsText',
                                    stateRef: 'settings.profile',
                                    icon: {cls: 'fa fa-cogs fa-lg'}
                                },
                                {
                                    label: 'navbar.logoutText',
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

            if (user.lastName) {
                name += user.lastName;
                if (user.firstName) {
                    name += ', ' + user.firstName;
                }
            } else if (user.firstName) {
                name += user.firstName;
            } else {
                name += user.auth.userName;
            }

            return name;
        }
    }
})();
