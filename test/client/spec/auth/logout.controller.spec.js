'use strict';

describe('LogoutCtrl', () => {
    let _scope,
        _auth,
        _controller;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('bcbsa-shell.auth'));

    beforeEach(inject(($rootScope, $controller) => {
        _scope = $rootScope.$new();

        _auth = jasmine.createSpyObj('auth', ['logout']);
        _controller = $controller('LogoutCtrl as logoutCtrl', {
            $scope: _scope,
            auth: _auth
        });
    }));

    it('should invoke auth logout', () => {
        expect(_auth.logout).toHaveBeenCalled();
    });
});
