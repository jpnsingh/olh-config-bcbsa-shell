(function () {
    'use strict';

    describe('RegisterCtrl', function () {
        var _scope,
            _q,
            _deferred,
            _state,
            _auth,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell.auth.controllers.registerController'));

        beforeEach(inject(function ($rootScope, $q, $controller) {
            _scope = $rootScope.$new();
            _q = $q;
            _deferred = _q.defer();
            _state = {
                go: function () {
                }
            };
            spyOn(_state, 'go').and.callThrough();

            _auth = {
                register: function () {
                }
            };
            spyOn(_auth, 'register').and.returnValue(_deferred.promise);

            _controller = $controller('RegisterCtrl as registerCtrl', {
                $scope: _scope,
                $state: _state,
                auth: _auth
            });
        }));

        it('should invoke auth register and handle accordingly on success', inject(function ($timeout) {
            var user = {
                userName: 'admin',
                password: 'admin'
            };
            _controller.user = user;

            expect(_controller.register).toBeDefined();

            _controller.register();

            expect(_controller.registering).toBeTruthy();
            expect(_auth.register).toHaveBeenCalledWith(user);

            _deferred.resolve();
            $timeout.flush();

            expect(_controller.registering).toBeFalsy();

            expect(_state.go).toHaveBeenCalledWith('dashboard');
        }));

        it('should invoke auth register handle accordingly on error', inject(function ($timeout) {
            var user = {
                userName: 'admin',
                password: 'admin'
            };
            _controller.user = user;

            expect(_controller.register).toBeDefined();

            _controller.register();

            expect(_controller.registering).toBeTruthy();
            expect(_auth.register).toHaveBeenCalledWith(user);

            _deferred.reject({error: 'error'});
            $timeout.flush();

            expect(_controller.registering).toBeFalsy();
            expect(_controller.error).toBe('error');
        }));
    });
})();
