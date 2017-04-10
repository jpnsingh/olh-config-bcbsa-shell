(function () {
    'use strict';

    describe('RoleCtrl:', function () {
        var rootScope,
            scope,
            q,
            deferList,
            deferUpdate,
            deferDelete,
            timeout,
            filter,
            auth,
            currentUserSpy,
            Role,
            RoleService,
            NotificationService,
            controller,
            getRoles = () => {
                return [
                    {_id: 'SuperUser', id: 'SuperUser', priority: 1},
                    {_id: 'PlanAdmin', id: 'PlanAdmin', priority: 2}
                ]
            },
            superUser = {
                firstName: 'Super',
                lastName: 'User',
                auth: {
                    userName: 'super',
                    password: 'user'
                },
                roles: [
                    getRoles()[0],
                ]
            },
            resolveRoles = () => {
                deferList.resolve({roles: getRoles()});
                timeout.flush();
            },
            rejectRoles = () => {
                deferList.reject({error: 'Error'});
                timeout.flush();
            };

        beforeEach(angular.mock.module('bcbsa-shell.config.role.roleFactory'));
        beforeEach(angular.mock.module('bcbsa-shell.config.role.controllers.roleController'));

        beforeEach(inject(($rootScope, $q, $timeout, $filter, _Role_, $controller) => {
            rootScope = $rootScope;
            scope = rootScope.$new();

            q = $q;
            deferList = q.defer();
            deferUpdate = q.defer();
            deferDelete = q.defer();
            timeout = $timeout;
            filter = $filter;

            currentUserSpy = jasmine.createSpy('currentUser');
            auth = {
                currentUser: currentUserSpy
            };
            currentUserSpy.and.returnValue(superUser);

            Role = _Role_;
            RoleService = {
                listRoles: jasmine.createSpy('listRoles').and.returnValue(deferList.promise),
                updateRole: jasmine.createSpy('updateRole').and.returnValue(deferUpdate.promise),
                deleteRole: jasmine.createSpy('deleteRole').and.returnValue(deferDelete.promise)
            };

            NotificationService = {
                displaySuccess: jasmine.createSpy('displaySuccess'),
                displayError: jasmine.createSpy('displayError')
            };

            controller = $controller('RoleCtrl as roleCtrl', {
                $scope: scope,
                $timeout: timeout,
                $filter: filter,
                auth: auth,
                Role: Role,
                RoleService: RoleService,
                NotificationService: NotificationService
            });
        }));

        it('should set canModifyRoles flag to true if current user is Super User', () => {
            expect(controller.canModifyRoles).toBe(true);
        });

        it('should initialize roles accordingly when role service responds with success', function () {
            expect(controller.loading).toBe(true);
            expect(RoleService.listRoles).toHaveBeenCalled();

            resolveRoles();

            expect(controller.loading).toBe(false);
            expect(controller.roles).toBeDefined();
            expect(controller.selected).toBeDefined();
        });

        it('should not initialize roles when role service responds with error', function () {
            expect(controller.loading).toBe(true);
            expect(RoleService.listRoles).toHaveBeenCalled();

            rejectRoles();

            expect(controller.loading).toBe(false);
            expect(controller.error).toBeDefined();
            expect(controller.selected).not.toBeDefined();
        });

        describe('addRole:', function () {
            it('should add a new Role and make that selected', () => {
                resolveRoles();

                controller.addRole();

                expect(controller.roles.length).toBe(3);
                expect(controller.selected).toEqual(new Role('').name('').description(''));
            });
        });

        describe('deleteRole:', function () {
            it('should delete the selected Role and reinitialize the selection accordingly', () => {
                resolveRoles();

                controller.deleteRole();

                expect(controller.updating).toBe(true);
                expect(RoleService.deleteRole).toHaveBeenCalledWith('SuperUser');

                deferDelete.resolve({success: {deleted: 1}});
                timeout.flush();

                expect(NotificationService.displaySuccess).toHaveBeenCalledWith('Role deleted successfully.');
                expect(controller.updating).toBe(false);
                expect(controller.roles.length).toBe(1);
                expect(controller.selected).toEqual(getRoles()[1]);
            });

            it('should handle the error accordingly', () => {
                resolveRoles();

                controller.deleteRole();

                expect(controller.updating).toBe(true);
                expect(RoleService.deleteRole).toHaveBeenCalledWith('SuperUser');

                deferDelete.reject({error: 'Error'});
                timeout.flush();

                expect(NotificationService.displayError).toHaveBeenCalledWith('Error deleting Role.');
                expect(controller.updating).toBe(false);
                expect(controller.error).toBeDefined();
                expect(controller.roles.length).toBe(2);
                expect(controller.selected).toEqual(getRoles()[0]);
            });
        });

        describe('updateRole:', function () {
            it('should update the selected Role accordingly', () => {
                resolveRoles();

                controller.updateRole();

                expect(controller.updating).toBe(true);
                expect(RoleService.updateRole).toHaveBeenCalledWith(controller.selected);

                deferUpdate.resolve({success: {deleted: 1}});
                timeout.flush();

                expect(NotificationService.displaySuccess).toHaveBeenCalledWith('Role updated successfully.');
                expect(controller.updating).toBe(false);
                expect(controller.editing).toBe(false);
                expect(controller.roles.length).toBe(2);
                expect(controller.selected).toEqual(getRoles()[0]);
            });

            it('should handle the error accordingly', () => {
                resolveRoles();

                controller.updateRole();

                expect(controller.updating).toBe(true);
                expect(RoleService.updateRole).toHaveBeenCalledWith(controller.selected);

                deferUpdate.reject({error: 'Error updating'});
                timeout.flush();

                expect(NotificationService.displayError).toHaveBeenCalledWith('Error updating Role.');
                expect(controller.updating).toBe(false);
                expect(controller.editing).toBe(false);
                expect(controller.error).toBeDefined();
                expect(controller.roles.length).toBe(2);
                expect(controller.selected).toEqual(getRoles()[0]);
            });
        });
    });
})();
