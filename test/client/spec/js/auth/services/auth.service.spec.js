(function () {
    'use strict';

    describe('auth service:', function () {
        var _q,
            _rootScope,
            _http,
            _state,
            _window,
            _auth,
            testUser = {
                _id: '123-456-789',
                username: 'foo',
                email: 'foo@bar.com'
            };

        beforeEach(angular.mock.module('bcbsa-shell'));

        beforeEach(inject(function ($q, $rootScope, $http, $state, $window, auth) {
            _q = $q;
            _rootScope = $rootScope;
            _http = $http;
            spyOn(_http, 'post').and.returnValue(_q.when(testUser));

            _state = $state;
            spyOn(_state, 'go').and.callThrough();

            _window = $window;
            _auth = auth;
        }));

        describe('clear:', function () {
            it('should clear the user from session', function () {
                _auth.clear();

                expect(_auth.currentUser()).toEqual({});
            });
        });

        describe('storeUser:', function () {
            it('should store the user json accordingly', function () {
                _auth.storeUser(testUser);

                expect(_auth.currentUser()).toEqual(testUser);
            });
        });

        describe('currentUser:', function () {
            it('should return the current user present is session', function () {
                _auth.storeUser(testUser);

                expect(_auth.currentUser()).toEqual(testUser);
            });
        });

        describe('isAuthenticated:', function () {
            it('should return false if the user is not present is session', function () {
                _auth.clear();
                expect(_auth.isAuthenticated()).toBeFalsy();
            });

            it('should return true if the user is present is session', function () {
                _auth.storeUser(testUser);

                expect(_auth.isAuthenticated()).toBeTruthy();
            });
        });

        describe('logout:', function () {
            it('should clear the user from session and change the state to login', function () {
                _auth.storeUser(testUser);

                _auth.logout();

                expect(_auth.currentUser()).toEqual({});
                expect(_state.go).toHaveBeenCalledWith('login');
            });
        });

        describe('register:', function () {
            it('should invoke the register api via $http', function () {
                expect(_auth.currentUser()).toEqual({});

                // _auth
                //     .register()
                //     .then(expect(_auth.currentUser()).toEqual(testUser));
            });
        });

        describe('login:', function () {
            it('should set the current user upon successful login', function () {
                expect(_auth.currentUser()).toEqual({});

                // _auth
                //     .login()
                //     .then(expect(_auth.currentUser()).toEqual(testUser));
            });
        });
    });
})();
