(function () {
    'use strict';

    xdescribe('RoleCtrl:', function () {
        var rootScope,
            scope,
            q,
            defer,
            timeout,
            filter,
            auth,
            currentUserSpy,
            Role,
            RoleService,
            NotificationService,
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
            adminUser = {
                firstName: 'Admin',
                lastName: 'Admin',
                auth: {
                    userName: 'admin',
                    password: 'admin'
                },
                roles: [
                    getRoles()[1]
                ]
            },
            controller;

        beforeEach(angular.mock.module('bcbsa-shell.config.role.roleFactory'));
        beforeEach(angular.mock.module('bcbsa-shell.config.role.controllers.roleController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, $filter, _Role_, $controller) {
            rootScope = $rootScope;
            scope = rootScope.$new();

            q = $q;
            defer = q.defer();
            timeout = $timeout;
            filter = $filter;

            currentUserSpy = jasmine.createSpy('currentUser');
            auth = {
                currentUser: currentUserSpy
            };
            currentUserSpy.and.returnValue(superUser);

            Role = _Role_;
            RoleService = {
                listRoles: jasmine.createSpy('listRoles').and.returnValue(defer.promise),
                updateRole: jasmine.createSpy('updateRole').and.returnValue(defer.promise),
                deleteRole: jasmine.createSpy('deleteRole').and.returnValue(defer.promise)
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

        it('should set canModifyRoles flag to true if current user is Super User', function () {
            expect(controller.canModifyRoles).toBe(true);
        });

        it('should initialize roles', function () {
            expect(controller.loading).toBe(true);

            expect(RoleService.listRoles).toHaveBeenCalled();

            defer.resolve({data: getRoles()});
            timeout.flush();

            expect(controller.loading).toBe(false);
            expect(controller.roles).toBeDefined();
            expect(controller.selected).toBeDefined();
        });

        describe('addRole:', function () {
            it('should add a new Role and make that selected', function () {
                controller.roles = getRoles();
                controller.addRole();

                expect(controller.roles.length).toBe(3);
                expect(controller.selected).toEqual(new Role('').name('').description(''));

                // controller.deleteRole();
            });
        });

        describe('deleteRole:', function () {
            it('should delete the selected Role and reinitialize the selection', function () {
                console.log('ddd');
                controller.roles = getRoles();
                console.log(controller.roles);
                controller.selected = controller.roles[0];

                controller.deleteRole();

                expect(controller.updating).toBe(true);

                defer.resolve({success: {deleted: 1}});
                timeout.flush();

                expect(RoleService.deleteRole).toHaveBeenCalledWith('SuperUser');

                expect(NotificationService.displaySuccess).toHaveBeenCalled();
                expect(controller.updating).toBe(false);

                expect(controller.roles.length).toBe(1);
                expect(controller.selected).toEqual(getRoles()[1]);
            });
        });

        describe('updateRole:', function () {

        });
    });

    function getRoles() {
        var superUserRole = {_id: 'SuperUser', id: 'SuperUser'},
            nonSuperUserRole = {_id: 'PlanAdmin', id: 'PlanAdmin'};

        return [
            superUserRole,
            nonSuperUserRole
        ]
    }
})();
