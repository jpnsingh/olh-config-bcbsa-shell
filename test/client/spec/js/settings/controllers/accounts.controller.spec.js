(function () {
    'use strict';

    describe('AccountsCtrl', function () {
        var injector,
            scope,
            controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('AccountsCtrl as vm', {$scope: scope});
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.header).toEqual('Account Settings');
        });
    });
})();
