(function () {
    'use strict';

    describe('LogoutCtrl', function () {
        var _scope,
            _auth,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();

            _auth = jasmine.createSpyObj('auth', ['logout']);
            _controller = $controller('LogoutCtrl as logoutCtrl', {
                $scope: _scope,
                auth: _auth
            });
        }));

        it('should invoke auth logout', function () {
            expect(_auth.logout).toHaveBeenCalled();
        });
    });
})();
