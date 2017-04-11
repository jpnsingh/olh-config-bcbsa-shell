'use strict';

describe('NavBarCtrl', () => {
    let scope,
        _window,
        controller;

    beforeEach(angular.mock.module('bcbsa-shell.navigation'));

    beforeEach(inject(($rootScope, $controller, $window) => {
        scope = $rootScope.$new();
        _window = $window;
        _window.sessionStorage.user = JSON.stringify({
            lastName: 'last',
            firstName: 'first',
            auth: {
                userName: 'UserName'
            }
        });
        controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});
    }));

    it('should initialize the controller and set loggedIn accordingly with sessionStorage', () => {
        expect(controller.loggedIn).toBeTruthy();
    });

    it('should initialize the top nav accordingly', () => {
        expect(controller.nav.top).toBeDefined();
        expect(controller.nav.top.header).toBeDefined();
        expect(controller.nav.top.links).toBeDefined();
    });

    it('should initialize the bottom nav accordingly', () => {
        expect(controller.nav.bottom).toBeDefined();
        expect(controller.nav.bottom.copyrightYear).toEqual(new Date().getFullYear());
    });

    it('should form the user displayName as lastName, firstName when both the fields are present', () => {
        expect(controller.displayName).toBeDefined();
        expect(controller.displayName).toEqual('last, first');
    });

    it('should form the user displayName as lastName when only lastName field is present', inject(($controller) => {
        _window.sessionStorage.user = JSON.stringify({
            lastName: 'last',
            auth: {
                userName: 'userName'
            }
        });
        controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});

        expect(controller.displayName).toBeDefined();
        expect(controller.displayName).toEqual('last');
    }));

    it('should form the user displayName as firstName when only firstName field is present', inject(($controller) => {
        _window.sessionStorage.user = JSON.stringify({
            firstName: 'first',
            auth: {
                userName: 'userName'
            }
        });
        controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});

        expect(controller.displayName).toBeDefined();
        expect(controller.displayName).toEqual('first');
    }));

    it('should form the user displayName as userName when only userName field is present', inject(($controller) => {
        _window.sessionStorage.user = JSON.stringify({
            auth: {
                userName: 'userName'
            }
        });
        controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});

        expect(controller.displayName).toBeDefined();
        expect(controller.displayName).toEqual('userName');
    }));
});
