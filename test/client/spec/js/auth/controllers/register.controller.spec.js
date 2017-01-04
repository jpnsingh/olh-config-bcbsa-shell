(function () {
    'use strict';

    describe('RegisterCtrl', function () {
        var _scope,
            _state,
            _auth,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();

            _state = jasmine.createSpyObj('$state', ['go']);
            _auth = jasmine.createSpyObj('auth', ['register']);

            _controller = $controller('RegisterCtrl as registerCtrl', {
                $scope: _scope,
                $state: _state,
                auth: _auth
            });
        }));

        it('should invoke auth register upon registering', function () {
            _controller.username = 'admin';
            _controller.password = 'admin';

            expect(_controller.register).toBeDefined();
        });
    });
})();
