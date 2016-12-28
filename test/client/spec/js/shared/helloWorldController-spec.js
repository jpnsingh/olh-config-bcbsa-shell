(function () {
    'use strict';

    describe('HelloWorldCtrl', function () {
        var injector,
            scope,
            controller;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell']);

            injector.invoke(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('HelloWorldCtrl as vm', {$scope: scope});
            });
        });

        it('should initialize the controller accordingly', function () {
            assert.equal(controller.message, 'Hello World from Angular Controller');
        });
    });
})();