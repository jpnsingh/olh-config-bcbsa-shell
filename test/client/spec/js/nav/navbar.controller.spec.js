(function () {
    'use strict';

    describe('NavBarCtrl', function () {
        var scope,
            state = {
                go: function () {

                }
            },
            controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('NavBarCtrl as vm', {$scope: scope, $state: state});
        }));

        it('should initialize the controller and set loggedIn accordingly with no sessionStorage', function () {
            expect(controller.loggedIn).toBeFalsy();
        });

        it('should initialize the top nav accordingly', function () {
            expect(controller.nav.top).toBeDefined();
            expect(controller.nav.top.header).toBeDefined();
            expect(controller.nav.top.links).toBeDefined();
        });

        it('should initialize the bottom nav accordingly', function () {
            expect(controller.nav.bottom).toBeDefined();
            expect(controller.nav.bottom.copyrightYear).toEqual(new Date().getFullYear());
        });
    });
})();
