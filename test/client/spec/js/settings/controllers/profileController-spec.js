(function () {
    'use strict';

    describe('ProfileCtrl', function () {
        var injector,
            scope,
            controller;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell']);

            injector.invoke(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('ProfileCtrl as vm', {$scope: scope});
            });
        });

        it('should initialize the controller accordingly', function () {
            assert.equal(controller.header, 'Profile Settings');
        });
    });
})();
