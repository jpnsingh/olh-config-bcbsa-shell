(function () {
    'use strict';

    describe('RoleService:', function () {
        let _q,
            _deferred,
            _rootScope,
            _http,
            _auth,
            _timeout,
            _roleService,
            _rolesSuccessResponse = {
                roles: [
                    {id: 'SuperUser', name: 'Super User', description: 'Superrrr User'},
                    {id: 'BCBSAAdmin', name: 'BCBSA Admin', description: 'Plan Admin Role'},
                    {id: 'PlanAdmin', name: 'Plan Admin', description: 'Association Admin Role'}
                ]
            },
            _errorResponse = {
                data: {
                    error: 'Error'
                }
            };

        beforeEach(angular.mock.module('bcbsa-shell.auth.services.authService'));
        beforeEach(angular.mock.module('bcbsa-shell.config.role.roleService'));

        beforeEach(inject(function ($q, $rootScope, $http, auth, $timeout, RoleService) {
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
                auth: {
                    userName: 'TestUser',
                    password: 'pwd'
                }
            });

            _timeout = $timeout;

            _roleService = RoleService;
        }));

        describe('listRoles:', function () {
            it('should fetch the list of roles', function () {
                _roleService.listRoles();

                expect(_http.get).toHaveBeenCalledWith('api/role/list');

                _deferred.resolve(_rolesSuccessResponse);

                _timeout.flush();

                expect(_deferred.promise).toResolveWith(_rolesSuccessResponse);
            });

            it('should handle the promise rejection accordingly', function () {
                _roleService.listRoles();

                expect(_http.get).toHaveBeenCalledWith('api/role/list');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('userRoles:', function () {
            it('should fetch the list of roles', function () {
                _roleService.userRoles();

                expect(_http.get).toHaveBeenCalledWith('api/role/userRoles');

                _deferred.resolve(_rolesSuccessResponse);

                _timeout.flush();

                expect(_deferred.promise).toResolveWith(_rolesSuccessResponse);
            });

            it('should handle the promise rejection accordingly', function () {
                _roleService.userRoles();

                expect(_http.get).toHaveBeenCalledWith('api/role/userRoles');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('deleteRole:', function () {
            it('should delete the role with the passed in roleId', function () {
                _roleService.deleteRole(123);

                expect(_http.delete).toHaveBeenCalledWith('api/role/123');

                _deferred.resolve({success: {deleted: 1}});

                _timeout.flush();

                expect(_deferred.promise).toResolveWith({success: {deleted: 1}});
            });

            it('should handle the promise rejection accordingly', function () {
                _roleService.deleteRole(1234);

                expect(_http.delete).toHaveBeenCalledWith('api/role/1234');

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });

        describe('updateRole:', function () {
            it('should update the role with the passed in role._id', function () {
                let role = {_id: '123abc', id: 'SuperUser', name: 'Super User', description: 'Superrrr User'};

                _roleService.updateRole(role);

                expect(_http.put).toHaveBeenCalledWith('api/role/123abc', {role: role, userName: 'TestUser'});

                _deferred.resolve({success: {updated: 1}});

                _timeout.flush();

                expect(_deferred.promise).toResolveWith({success: {updated: 1}});
            });

            it('should call for new role creation if the passed in role is newly created one', function () {
                let role = {id: 'NewRole', name: 'New Role', description: 'New Role'};

                _roleService.updateRole(role);

                expect(_http.put).toHaveBeenCalledWith('api/role/new', {role: role, userName: 'TestUser'});

                _deferred.resolve({success: {updated: 1}});

                _timeout.flush();

                expect(_deferred.promise).toResolveWith({success: {updated: 1}});
            });

            it('should handle the promise rejection accordingly', function () {
                let role = {_id: '123abc', id: 'SuperUser', name: 'Super User', description: 'Superrrr User'};

                _roleService.updateRole(role);

                expect(_http.put).toHaveBeenCalledWith('api/role/123abc', {role: role, userName: 'TestUser'});

                _deferred.reject(_errorResponse);

                _timeout.flush();

                expect(_deferred.promise).toRejectWith(_errorResponse);
            });
        });
    });
})();
