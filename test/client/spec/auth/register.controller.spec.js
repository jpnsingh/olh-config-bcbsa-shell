'use strict';

describe('RegisterCtrl', () => {
    let _scope,
        _q,
        _deferred,
        _user,
        _response,
        _state,
        _auth,
        _controller;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('bcbsa-shell.auth'));

    beforeEach(inject(function ($rootScope, $q, $controller) {
        _scope = $rootScope.$new();
        _q = $q;
        _deferred = _q.defer();
        _user = {auth: {userName: 'test', password: 'pwd'}, firstName: 'First', lastName: 'Last'};
        _response = {
            user: _user
        };
        _state = {
            go: angular.noop
        };
        spyOn(_state, 'go').and.callThrough();

        _auth = {
            register: angular.noop
        };
        spyOn(_auth, 'register').and.returnValue(_deferred.promise);

        _controller = $controller('RegisterCtrl as registerCtrl', {
            $scope: _scope,
            $state: _state,
            auth: _auth
        });
    }));

    it('should invoke auth register and handle accordingly on success', inject(($timeout) => {
        _controller.user = _user;

        _controller.register();

        expect(_controller.registering).toBeTruthy();
        expect(_auth.register).toHaveBeenCalledWith(_user);

        _deferred.resolve(_response);
        $timeout.flush();

        expect(_controller.registering).toBeFalsy();

        expect(_state.go).toHaveBeenCalledWith('dashboard');
    }));

    it('should invoke auth register handle accordingly on error', inject(($timeout) => {
        _controller.user = _user;

        _controller.register();

        expect(_controller.registering).toBeTruthy();
        expect(_auth.register).toHaveBeenCalledWith(_user);

        _deferred.reject({message: 'error'});
        $timeout.flush();

        expect(_controller.registering).toBeFalsy();
        expect(_controller.error).toEqual({message: 'error'});
    }));
});
