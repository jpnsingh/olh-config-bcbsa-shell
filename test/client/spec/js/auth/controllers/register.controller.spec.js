(function () {
    'use strict';

    describe('RegisterCtrl', function () {
        var _injector,
            _scope,
            _state,
            _authService,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();

            _state = jasmine.createSpyObj('$state', ['go']);
            _authService = jasmine.createSpyObj('AuthService', ['register']);

            _controller = $controller('RegisterCtrl as registerCtrl', {
                $scope: _scope,
                $state: _state,
                AuthService: _authService
            });
        }));

        it('should invoke AuthService register upon registering', function () {
            _controller.username = 'admin';
            _controller.password = 'admin';

            expect(_controller.register).toBeDefined();
        });
    });
})();
