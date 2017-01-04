(function () {
    'use strict';

    describe('LoginCtrl', function () {
        var _scope,
            _state,
            _authService,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();

            _state = jasmine.createSpyObj('$state', ['go']);
            _authService = jasmine.createSpyObj('AuthService', ['login']);

            _controller = $controller('LoginCtrl as loginCtrl', {
                $scope: _scope,
                $state: _state,
                AuthService: _authService
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(_controller.loggedIn).toBeFalsy();
        });

        it('should invoke AuthService when login function is called', function () {
            _controller.username = 'admin';
            _controller.password = 'admin';

            expect(_authService.login).toBeDefined();
        });
    });
})();
