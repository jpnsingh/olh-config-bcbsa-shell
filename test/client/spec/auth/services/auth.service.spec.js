'use strict';

describe('auth service:', () => {
    let _q,
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
                password: 'bar',
                grantType: 'password'
            },
            email: 'foo@bar.com',
            roles: [{id: 'PlanAdmin'}]
        };

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('bcbsa-shell.auth.services'));

    beforeEach(inject(($q, $rootScope, $http, $window, $state, $timeout, auth) => {
        _q = $q;
        _deferred = _q.defer();

        _rootScope = $rootScope;
        spyOn(_rootScope, '$broadcast').and.callThrough();

        _http = $http;
        spyOn(_http, 'post').and.returnValue(_deferred.promise);

        _state = $state;
        spyOn(_state, 'go').and.callFake(angular.noop);

        _timeout = $timeout;
        _window = $window;

        _auth = auth;
    }));

    afterEach(() => {
        _auth.clear();
    });

    describe('clear:', () => {
        it('should clear the user from session', () => {
            _auth.clear();

            expect(_auth.currentUser()).toEqual({});
        });
    });

    describe('storeUser:', () => {
        it('should store the user json accordingly', () => {
            _auth.storeUser(testUser);

            expect(_auth.currentUser()).toEqual(testUser);
        });
    });

    describe('currentUser:', () => {
        it('should return the current user present is session', () => {
            _auth.storeUser(testUser);

            expect(_auth.currentUser()).toEqual(testUser);
        });
    });

    describe('isAuthenticated:', () => {
        it('should return false if the user is not present is session', () => {
            _auth.clear();
            expect(_auth.isAuthenticated()).toBeFalsy();
        });

        it('should return true if the user is present is session', () => {
            _auth.storeUser(testUser);

            expect(_auth.isAuthenticated()).toBeTruthy();
        });
    });

    describe('logout:', () => {
        it('should clear the user from session and change the state to login', () => {
            _auth.storeUser(testUser);

            _auth.logout();

            expect(_auth.currentUser()).toEqual({});
            expect(_state.go).toHaveBeenCalledWith('login');
        });
    });

    describe('register:', () => {
        it('should invoke the register api via $http', () => {
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

        it('should handle the error accordingly', () => {
            expect(_auth.currentUser()).toEqual({});

            _auth.register(testUser);

            expect(_http.post).toHaveBeenCalled();

            _deferred.reject({data: {error: 'register error'}});

            _timeout.flush();

            expect(_rootScope.$broadcast).toHaveBeenCalledWith('authenticationFailed');
        });
    });

    describe('login:', () => {
        it('should set the current user upon successful login', () => {
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

            expect(_auth.currentUser().roles).toEqual([{id: 'PlanAdmin'}]);
        });

        it('should handle the failure accordingly', () => {
            expect(_auth.currentUser()).toEqual({});

            _auth.login('foo', 'bar');

            expect(_http.post).toHaveBeenCalledWith('/api/auth/login', {userName: 'foo', password: 'bar'}, {});

            _deferred.reject({data: {error: 'login error'}});

            _timeout.flush();

            expect(_rootScope.$broadcast).toHaveBeenCalledWith('authenticationFailed');
        });
    });
});
