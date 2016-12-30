(function () {
    'use strict';

    describe('AccountsCtrl', function () {
        var injector,
            scope,
            controller;

        beforeEach(function () {
            injector = angular.injector(['bcbsa-shell']);

            injector.invoke(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('AccountsCtrl as vm', {$scope: scope});
            });
        });

        it('should initialize the controller accordingly', function () {
            assert.equal(controller.header, 'Account Settings');
        });
    });
})();
