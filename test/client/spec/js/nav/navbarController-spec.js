(function () {
    'use strict';

    describe('NavBarCtrl', function () {
        var injector,
            scope,
            controller;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell']);

            injector.invoke(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('NavBarCtrl as vm', {$scope: scope});
            });
        });

        it('should initialize the controller and set signedIn accordingly', function () {
            assert.equal(controller.signedIn, true);
        });

        it('should initialize the top nav accordingly', function () {
            assert.isDefined(controller.nav.top);
            assert.isDefined(controller.nav.top.header);
            assert.isDefined(controller.nav.top.links);
        });

        it('should initialize the bottom nav accordingly', function () {
            assert.isDefined(controller.nav.bottom);
            assert.equal(controller.nav.bottom.copyrightYear, new Date().getFullYear())
        });
    });
})();
