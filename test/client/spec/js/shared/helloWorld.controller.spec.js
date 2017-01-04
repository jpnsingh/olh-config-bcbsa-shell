(function () {
    'use strict';

    describe('HelloWorldCtrl', function () {
        var scope,
            controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('HelloWorldCtrl as vm', {$scope: scope});
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.message).toEqual('Hello World from Angular Controller');
        });
    });
})();