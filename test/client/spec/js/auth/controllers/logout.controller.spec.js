(function () {
    'use strict';

    describe('LogoutCtrl', function () {
        var _injector,
            _scope,
            _authService,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();

            _authService = jasmine.createSpyObj('AuthService', ['logout']);
            _controller = $controller('LogoutCtrl as logoutCtrl', {
                $scope: _scope,
                AuthService: _authService
            });
        }));

        it('should invoke AuthService logout', function () {
            expect(_authService.logout).toHaveBeenCalled();
        });
    });
})();
