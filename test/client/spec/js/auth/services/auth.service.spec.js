(function () {
    'use strict';

    describe('auth service:', function () {
        var _rootScope,
            _injector,
            _http,
            _state,
            _window,
            _auth;

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($rootScope, $injector, $http, $state, $window, auth) {
            _rootScope = $rootScope;
            _injector = $injector;
            _http = $http;
            _state = $state;
            spyOn(_state, 'go').and.callThrough();
            _window = $window;
            _auth = auth;
        }));

        describe('clear:', function () {
            it('should clear the user from rootScope and sessionStorage and set loggedIn as false', function () {
                _auth.clear();

                expect(_rootScope.user).toBe('');
                expect(_window.sessionStorage.user).toBe('');
                expect(_auth.loggedIn).toBeFalsy();
            });
        });

        describe('setLoggedIn and getLoggedIn:', function () {
            it('should set and retrieve the loggedIn status accordingly', function () {
                expect(_auth.getLoggedIn()).toBeFalsy();

                _auth.setLoggedIn(true);

                expect(_auth.getLoggedIn()).toBeTruthy();
            });
        });

        describe('isAuthenticated:', function () {
            it('should return false if the user is not present is sessionStorage', function () {

                expect(_auth.isAuthenticated()).toBeFalsy();
            });

            it('should return true if the user is present is sessionStorage', function () {
                _window.sessionStorage.user = JSON.stringify({username: 'test', password: 'test'});

                expect(_auth.isAuthenticated()).toBeTruthy();
            });
        });

        describe('logout:', function () {
            it('should clear the user from session and change the state to login', function () {
                var user = JSON.stringify({username: 'test', password: 'test'});
                _window.sessionStorage.user = user;
                _rootScope.user = user;

                _auth.logout();

                expect(_rootScope.user).toBe('');
                expect(_window.sessionStorage.user).toBe('');
                expect(_auth.loggedIn).toBeFalsy();
                expect(_state.go).toHaveBeenCalledWith('login');
            });
        });

        describe('register:', function () {
            it('should invoke the register api via $http', function () {
                _auth.register('testUser', 'testPassword');
                //TODO: complete this spec
            });
        });

        describe('login:', function () {
            it('should invoke the login api via $http', function () {
                _auth.login('testUser', 'testPassword');
                //TODO: complete this spec
            });
        });
    });
})();
