'use strict';

describe('AccountsCtrl', () => {
    let scope,
        controller;

    beforeEach(angular.mock.module('bsbsa-shell.settings'));

    beforeEach(inject(($rootScope, $controller) => {
        scope = $rootScope.$new();
        controller = $controller('AccountsCtrl as vm', {$scope: scope});
    }));

    it('should initialize the controller accordingly', () => {
        expect(controller.header).toEqual('Account Settings');
    });
});
