(function () {
    'use strict';

    describe('ConfigCtrl', function () {
        var scope,
            controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('ConfigCtrl as configCtrl', {$scope: scope});
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.loading).toBeTruthy();
        });
    });
})();
