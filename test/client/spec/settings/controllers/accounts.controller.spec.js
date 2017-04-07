(function () {
    'use strict';

    describe('AccountsCtrl', function () {
        var scope,
            controller;

        beforeEach(angular.mock.module('bsbsa-shell.settings.controllers.accountsController'));

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('AccountsCtrl as vm', {$scope: scope});
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.header).toEqual('Account Settings');
        });
    });
})();
