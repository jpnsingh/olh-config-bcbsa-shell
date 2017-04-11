'use strict';

export class NavBarCtrl {
    constructor($window) {
        this.$window = $window;
        this.init();
    }

    init() {
        this.user = !_.isEmpty(this.$window.sessionStorage.user) ? JSON.parse(this.$window.sessionStorage.user) : {};
        this.loggedIn = !_.isEmpty(this.user);
        this.displayName = this.loggedIn ? this.displayName(this.user) : '';

        this.nav = {
            top: {
                header: {
                    label: 'navbar.top.header',
                    stateRef: 'dashboard'
                },
                links: {
                    left: [
                        {label: 'navbar.top.configurationText', stateRef: 'configuration.role', activeState: 'configuration'}
                    ],
                    right: [
                        {
                            label: 'navbar.top.userMenu.profileText',
                            icon: {cls: 'fa fa-user fa-lg'},
                            userMenu: true,
                            list: [
                                {
                                    label: 'navbar.top.userMenu.aboutText',
                                    stateRef: 'about'
                                },
                                {
                                    label: 'navbar.top.userMenu.helpText',
                                    stateRef: 'help'
                                },
                                {
                                    divider: true
                                },
                                {
                                    label: 'navbar.top.userMenu.settingsText',
                                    stateRef: 'settings.profile',
                                    icon: {cls: 'fa fa-cogs fa-lg'}
                                },
                                {
                                    label: 'navbar.top.userMenu.logoutText',
                                    stateRef: 'logout',
                                    icon: {cls: 'fa fa-sign-out fa-lg'}
                                }
                            ]
                        }
                    ]
                }
            },
            bottom: {
                copyrightYear: new Date().getFullYear(),
                citation: 'navbar.bottom.citation'
            }
        };
    }

    displayName(user) {
        let name = '';

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

NavBarCtrl.$inject = ['$window'];
