(function () {
    'use strict';

    describe('UserService:', function () {
        let _q,
            _deferred,
            _rootScope,
            _http,
            _auth,
            _timeout,
            _userService,
            _usersSuccessResponse = {
                users: [
                    {_id: 'user1', firstName: 'First 1', lastName: 'Last 1'},
                    {_id: 'user2', firstName: 'First 2', lastName: 'Last 2'}
                ]
            },
            _groupsSuccessResponse = {
                groups: [
                    {
                        name: 'Root',
                        description: 'Root Config',
                        config: {
                            planSetup: {},
                            planAdditional: {},
                            featurePool: {
                                appPool: []
                            }
                        }
                    }
                ]
            },
            _errorResponse = {
                data: {
                    error: 'Error'
                }
            };

        beforeEach(angular.mock.module('bcbsa-shell.auth.services.authService'));
        beforeEach(angular.mock.module('bcbsa-shell.config.user.services.userService'));

        beforeEach(inject(function ($q, $rootScope, $http, auth, $timeout, UserService) {
            _q = $q;
            _deferred = _q.defer();

            _rootScope = $rootScope;

            _http = $http;
            spyOn(_http, 'get').and.returnValue(_deferred.promise);
            spyOn(_http, 'post').and.returnValue(_deferred.promise);
            spyOn(_http, 'delete').and.returnValue(_deferred.promise);
            spyOn(_http, 'put').and.returnValue(_deferred.promise);

            _auth = auth;
            spyOn(_auth, 'currentUser').and.returnValue({
                _id: 'currentUser1',
                auth: {
                    userName: 'TestUser',
                    password: 'pwd'
                }
            });

            _timeout = $timeout;

            _userService = UserService;
        }));

        describe('getUsers:', function () {
            it('should fetch the list of users', function () {
                _userService.getUsers();

                expect(_http.get).toHaveBeenCalledWith('api/user/list');

                _deferred.resolve(_usersSuccessResponse);

                _timeout.flush();

                expect(_deferred.promise).toResolveWith(_usersSuccessResponse);
            });

            it('should handle the promise rejection accordingly', function () {
                _userService.getUsers();

                expect(_http.get).toHaveBeenCalledWith('api/user/list');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('getUserGroups:', function () {
            it('should fetch the list of user groups', function () {
                _userService.getUserGroups();

                expect(_http.get).toHaveBeenCalledWith('api/user/currentUser1/groups');

                _deferred.resolve(_groupsSuccessResponse);

                _timeout.flush();

                expect(_deferred.promise).toResolveWith(_groupsSuccessResponse);
            });

            it('should handle the promise rejection accordingly', function () {
                _userService.getUserGroups();

                expect(_http.get).toHaveBeenCalledWith('api/user/currentUser1/groups');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('deleteUser:', function () {
            it('should delete the user with the passed in roleId', function () {
                _userService.deleteUser(123);

                expect(_http.delete).toHaveBeenCalledWith('api/user/123');

                _deferred.resolve({success: {deleted: 1}});

                _timeout.flush();

                expect(_deferred.promise).toResolveWith({success: {deleted: 1}});
            });

            it('should handle the promise rejection accordingly', function () {
                _userService.deleteUser(123);

                expect(_http.delete).toHaveBeenCalledWith('api/user/123');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('updateUser:', function () {
            it('should update the role with the passed in role._id', function () {
                let user = {_id: 'user1', firstName: 'First 1', lastName: 'Last 1'};

                _userService.updateUser(user);

                expect(_http.put).toHaveBeenCalledWith('api/user/user1', {user: user, userName: 'TestUser'});

                _deferred.resolve({success: {updated: 1}});

                _timeout.flush();

                expect(_deferred.promise).toResolveWith({success: {updated: 1}});
            });

            it('should call for new role creation if the passed in role is newly created one', function () {
                let user = {firstName: 'New First 1', lastName: 'New Last 1'};

                _userService.updateUser(user);

                expect(_http.put).toHaveBeenCalledWith('api/user/new', {user: user, userName: 'TestUser'});

                _deferred.resolve({success: {updated: 1}});

                _timeout.flush();

                expect(_deferred.promise).toResolveWith({success: {updated: 1}});
            });

            it('should handle the promise rejection accordingly', function () {
                let user = {_id: 'user1', firstName: 'First 1', lastName: 'Last 1'};

                _userService.updateUser(user);

                expect(_http.put).toHaveBeenCalledWith('api/user/user1', {user: user, userName: 'TestUser'});

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });
    });
})();
