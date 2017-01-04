(function () {
    'use strict';

    describe('LoginCtrl', function () {
        var _scope,
            _state,
            _auth,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();

            _state = jasmine.createSpyObj('$state', ['go']);
            _auth = jasmine.createSpyObj('auth', ['login']);

            _controller = $controller('LoginCtrl as loginCtrl', {
                $scope: _scope,
                $state: _state,
                auth: _auth
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(_controller.loggedIn).toBeFalsy();
        });

        it('should invoke auth when login function is called', function () {
            _controller.username = 'admin';
            _controller.password = 'admin';

            expect(_auth.login).toBeDefined();
        });
    });
})();
