(function () {
    'use strict';

    describe('LoginCtrl', function () {
        var _scope,
            _q,
            _deferred,
            _timeout,
            _state,
            _auth,
            _controller;

        beforeEach(angular.mock.module('bcbsa-shell.auth.controllers.loginController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, $controller) {
            _scope = $rootScope.$new();
            _q = $q;
            _deferred = _q.defer();
            _timeout = $timeout;
            _state = {
                go: function () {
                }
            };
            spyOn(_state, 'go').and.callThrough();

            _auth = {
                login: function () {
                }
            };
            spyOn(_auth, 'login').and.returnValue(_deferred.promise);

            _controller = $controller('LoginCtrl as loginCtrl', {
                $scope: _scope,
                $state: _state,
                auth: _auth
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(_controller.loggedIn).toBeFalsy();
        });

        it('should invoke auth when and handle success accordingly', function () {
            _controller.userName = 'admin';
            _controller.password = 'admin';

            expect(_auth.login).toBeDefined();

            _controller.login();

            expect(_auth.login).toHaveBeenCalledWith('admin', 'admin');
            expect(_controller.loggingIn).toBeTruthy();

            _deferred.resolve({userName: 'test'});
            _timeout.flush();

            expect(_controller.loggingIn).toBeFalsy();

            expect(_state.go).toHaveBeenCalledWith('dashboard');
        });

        it('should invoke auth when and handle error accordingly', function () {
            _controller.userName = 'admin';
            _controller.password = 'admin';

            expect(_auth.login).toBeDefined();

            _controller.login();

            expect(_auth.login).toHaveBeenCalledWith('admin', 'admin');
            expect(_controller.loggingIn).toBeTruthy();

            _deferred.reject({error: 'testError'});
            _timeout.flush();

            expect(_controller.loggingIn).toBeFalsy();
            expect(_controller.error).toEqual({error: 'testError'});
        });
    });
})();
