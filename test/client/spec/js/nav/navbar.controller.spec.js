(function () {
    'use strict';

    describe('NavBarCtrl', function () {
        var scope,
            _window,
            controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller, $window) {
            scope = $rootScope.$new();
            _window = $window;
            controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});
        }));

        it('should initialize the controller and set loggedIn accordingly with sessionStorage', inject(function ($controller) {
            _window.sessionStorage.user = JSON.stringify({
                lastname: 'last',
                firstname: 'first',
                username: 'username'
            });
            controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});

            expect(controller.loggedIn).toBeTruthy();
        }));

        it('should initialize the top nav accordingly', function () {
            expect(controller.nav.top).toBeDefined();
            expect(controller.nav.top.header).toBeDefined();
            expect(controller.nav.top.links).toBeDefined();
        });

        it('should initialize the bottom nav accordingly', function () {
            expect(controller.nav.bottom).toBeDefined();
            expect(controller.nav.bottom.copyrightYear).toEqual(new Date().getFullYear());
        });

        it('should form the user displayName as lastName, firstName when both the fields are present', function () {
            expect(controller.displayName).toBeDefined();
            expect(controller.displayName).toEqual('last, first');
        });

        it('should form the user displayName as lastname when only lastname field is present', inject(function ($controller) {
            _window.sessionStorage.user = JSON.stringify({
                lastname: 'last',
                username: 'username'
            });
            controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});

            expect(controller.displayName).toBeDefined();
            expect(controller.displayName).toEqual('last');
        }));

        it('should form the user displayName as firstname when only firstname field is present', inject(function ($controller) {
            _window.sessionStorage.user = JSON.stringify({
                firstname: 'first',
                username: 'username'
            });
            controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});

            expect(controller.displayName).toBeDefined();
            expect(controller.displayName).toEqual('first');
        }));

        it('should form the user displayName as username when only username field is present', inject(function ($controller) {
            _window.sessionStorage.user = JSON.stringify({
                username: 'username'
            });
            controller = $controller('NavBarCtrl', {$scope: scope, $window: _window});

            expect(controller.displayName).toBeDefined();
            expect(controller.displayName).toEqual('username');
        }));
    });
})();
