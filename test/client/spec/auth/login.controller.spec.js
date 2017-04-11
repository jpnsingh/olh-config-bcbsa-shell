'use strict';

describe('LoginCtrl', () => {
    let _scope,
        _q,
        _deferred,
        _timeout,
        _state,
        _auth,
        _controller;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('bcbsa-shell.auth'));

    beforeEach(inject(($rootScope, $q, $timeout, $controller) => {
        _scope = $rootScope.$new();
        _q = $q;
        _deferred = _q.defer();
        _timeout = $timeout;
        _state = {
            go: angular.noop
        };
        spyOn(_state, 'go').and.callThrough();

        _auth = {
            login: angular.noop
        };
        spyOn(_auth, 'login').and.returnValue(_deferred.promise);

        _controller = $controller('LoginCtrl as loginCtrl', {
            $scope: _scope,
            $state: _state,
            auth: _auth
        });
    }));

    it('should initialize the controller accordingly', () => {
        expect(_controller.loggedIn).toBeFalsy();
    });

    it('should invoke auth when and handle success accordingly', () => {
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

    it('should invoke auth when and handle error accordingly', () => {
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
