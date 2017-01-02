(function () {
    'use strict';

    module.exports = angular.module('bcbsa-shell.navigation.controllers.navBarController', [])
        .controller('NavBarCtrl', [
            '$rootScope', '$state', 'AuthService',
            function ($rootScope, $state, AuthService) {
                var vm = this;

                vm.loggedIn = !!$rootScope.user;

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
                                {label: 'Settings', stateRef: 'settings', icon: {cls: 'fa fa-cogs fa-lg'}},
                                {label: 'Logout', stateRef: 'logout', icon: {cls: 'fa fa-sign-out fa-lg'}}
                            ]
                        }
                    },
                    bottom: {
                        copyrightYear: new Date().getFullYear()
                    }
                };
            }
        ]);
})();
