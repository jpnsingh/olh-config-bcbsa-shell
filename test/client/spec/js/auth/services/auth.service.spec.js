(function () {
    'use strict';

    describe('auth service:', function () {
        var _q,
            _deferred,
            _rootScope,
            _http,
            _window,
            _state,
            _timeout,
            _auth,
            testUser = {
                _id: '123-456-789',
                auth: {
                    userName: 'foo',
                    password: 'bar'
                },
                email: 'foo@bar.com',
                roles: ['PlanAdmin']
            };

        beforeEach(angular.mock.module('bcbsa-shell.auth.services.authService'));

        beforeEach(inject(function ($q, $rootScope, $http, $window, $state, $timeout, auth) {
            _q = $q;
            _deferred = _q.defer();

            _rootScope = $rootScope;
            spyOn(_rootScope, '$broadcast').and.callThrough();

            _http = $http;
            spyOn(_http, 'post').and.returnValue(_deferred.promise);

            _state = $state;
            spyOn(_state, 'go').and.callFake(function () {
            });

            _timeout = $timeout;
            _window = $window;

            _auth = auth;
        }));

        afterEach(function () {
            _auth.clear();
        });

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

                _auth.register(testUser);

                expect(_http.post).toHaveBeenCalled();

                _deferred.resolve({data: {user: testUser}});

                _timeout.flush();

                expect(_auth.currentUser()).toEqual(jasmine.objectContaining({
                    auth: {
                        userName: 'foo',
                        password: 'bar',
                        grantType: 'password'
                    }
                }));
            });

            it('should handle the error accordingly', function () {
                expect(_auth.currentUser()).toEqual({});

                _auth.register(testUser);

                expect(_http.post).toHaveBeenCalled();

                _deferred.reject({data: {error: 'register error'}});

                _timeout.flush();

                expect(_rootScope.$broadcast).toHaveBeenCalledWith('authenticationFailed');
            });
        });

        describe('login:', function () {
            it('should set the current user upon successful login', function () {
                expect(_auth.currentUser()).toEqual({});

                _auth.login('foo', 'bar');

                expect(_http.post).toHaveBeenCalledWith('/api/auth/login', {userName: 'foo', password: 'bar'}, {});

                _deferred.resolve({data: {user: testUser}});

                _timeout.flush();

                expect(_auth.currentUser()).toEqual(jasmine.objectContaining({
                    auth: {
                        userName: 'foo',
                        password: 'bar',
                        grantType: 'password'
                    }
                }));

                expect(_auth.currentUser().roles).toEqual(['PlanAdmin']);
            });

            it('should handle the failure accordingly', function () {
                expect(_auth.currentUser()).toEqual({});

                _auth.login('foo', 'bar');

                expect(_http.post).toHaveBeenCalledWith('/api/auth/login', {userName: 'foo', password: 'bar'}, {});

                _deferred.reject({data: {error: 'login error'}});

                _timeout.flush();

                expect(_rootScope.$broadcast).toHaveBeenCalledWith('authenticationFailed');
            });
        });
    });
})();
