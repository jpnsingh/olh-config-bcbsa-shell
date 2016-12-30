(function () {
    'use strict';

    describe('ConfigCtrl', function () {
        var injector,
            scope,
            controller;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell']);

            injector.invoke(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('ConfigCtrl as configCtrl', {$scope: scope});
            });
        });

        it('should initialize the controller accordingly', function () {
            assert.equal(controller.loading, true);
        });
    });
})();
