(function () {
    'use strict';

    describe('UserCtrl:', function () {
        let rootScope,
            scope,
            q,
            deferUserList,
            deferUserUpdate,
            deferUserDelete,
            deferRolesList,
            deferConfigList,
            timeout,
            auth,
            currentUserSpy,
            User,
            UserService,
            RoleService,
            ConfigService,
            NotificationService,
            controller,
            getRoles = () => {
                return [
                    {_id: 'SuperUser', id: 'SuperUser', priority: 1},
                    {_id: 'PlanAdmin', id: 'PlanAdmin', priority: 2}
                ]
            },
            getGroups = () => {
                return [
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
            getUsers = () => {
                return [
                    {_id: 'user1', firstName: 'First 1', lastName: 'Last 1'},
                    {_id: 'user2', firstName: 'First 2', lastName: 'Last 2'}
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
            resolveUsers = () => {
                deferUserList.resolve({users: getUsers()});
                timeout.flush();
            },
            rejectUsers = () => {
                deferUserList.reject({error: 'Error'});
                timeout.flush();
            };

        beforeEach(angular.mock.module('bcbsa-shell.user.services.userFactory'));
        beforeEach(angular.mock.module('bcbsa-shell.config.user.controllers.userController'));

        beforeEach(inject(($rootScope, $q, $timeout, _User_, $controller) => {
            rootScope = $rootScope;
            scope = rootScope.$new();

            q = $q;
            deferUserList = q.defer();
            deferUserUpdate = q.defer();
            deferUserDelete = q.defer();
            deferRolesList = q.defer();
            deferConfigList = q.defer();
            timeout = $timeout;

            currentUserSpy = jasmine.createSpy('currentUser');
            auth = {
                currentUser: currentUserSpy
            };
            currentUserSpy.and.returnValue(superUser);

            User = _User_;
            UserService = {
                getUsers: jasmine.createSpy('getUsers').and.returnValue(deferUserList.promise),
                updateUser: jasmine.createSpy('updateUser').and.returnValue(deferUserUpdate.promise),
                deleteUser: jasmine.createSpy('deleteUser').and.returnValue(deferUserDelete.promise)
            };

            RoleService = {
                userRoles: jasmine.createSpy('userRoles').and.returnValue(deferRolesList.promise)
            };

            ConfigService = {
                listGroups: jasmine.createSpy('listGroups').and.returnValue(deferConfigList.promise)
            };

            NotificationService = {
                displaySuccess: jasmine.createSpy('displaySuccess'),
                displayError: jasmine.createSpy('displayError')
            };

            controller = $controller('UserCtrl as userCtrl', {
                $scope: scope,
                auth: auth,
                User: User,
                UserService: UserService,
                RoleService: RoleService,
                ConfigService: ConfigService,
                NotificationService: NotificationService
            });
        }));

        it('should set canModifyRoles flag to true if current user is Super User', () => {
            expect(controller.canModifyUsers).toBe(true);
        });

        it('should initialize user roles accordingly', function () {
            expect(RoleService.userRoles).toHaveBeenCalled();

            deferRolesList.resolve({roles: getRoles()});
            timeout.flush();

            expect(controller.roles).toBeDefined();
        });

        it('should initialize user groups accordingly', function () {
            expect(ConfigService.listGroups).toHaveBeenCalled();

            deferConfigList.resolve({groups: getGroups()});
            timeout.flush();

            expect(controller.groups).toBeDefined();
        });

        it('should not initialize users when user service responds with success', function () {
            expect(controller.users).toEqual([]);
            expect(controller.loadingUsers).toBe(true);
            expect(UserService.getUsers).toHaveBeenCalled();

            resolveUsers();

            expect(controller.loadingUsers).toBe(false);
            expect(controller.users).toEqual(getUsers());
            expect(controller.selected).toEqual(getUsers()[0]);
        });

        it('should handle the promise rejection when user service responds with error', function () {
            expect(controller.loadingUsers).toBe(true);
            expect(UserService.getUsers).toHaveBeenCalled();

            rejectUsers();

            expect(controller.loadingUsers).toBe(false);
            expect(controller.error).toBeDefined();
            expect(controller.selected).not.toBeDefined();
        });

        describe('addUser:', function () {
            it('should add a new User and make that selected', () => {
                resolveUsers();

                controller.addUser();

                expect(controller.users.length).toBe(3);
                expect(controller.selected).toEqual(new User());
            });
        });

        describe('deleteUser:', function () {
            it('should delete the selected User and reinitialize the selection accordingly', () => {
                resolveUsers();

                controller.deleteUser();

                expect(controller.updating).toBe(true);
                expect(UserService.deleteUser).toHaveBeenCalledWith('user1');

                deferUserDelete.resolve({success: {deleted: 1}});
                timeout.flush();

                expect(NotificationService.displaySuccess).toHaveBeenCalledWith('User deleted successfully.');
                expect(controller.updating).toBe(false);
                expect(controller.users.length).toBe(1);
                expect(controller.selected).toEqual(getUsers()[1]);
            });

            it('should handle the error accordingly', () => {
                resolveUsers();

                controller.deleteUser();

                expect(controller.updating).toBe(true);
                expect(UserService.deleteUser).toHaveBeenCalledWith('user1');

                deferUserDelete.reject({error: 'Error'});
                timeout.flush();

                expect(NotificationService.displayError).toHaveBeenCalledWith('Error deleting User.');
                expect(controller.updating).toBe(false);
                expect(controller.error).toBeDefined();
                expect(controller.users.length).toBe(2);
                expect(controller.selected).toEqual(getUsers()[0]);
            });
        });

        describe('updateUser:', function () {
            it('should update the selected User accordingly', () => {
                resolveUsers();

                controller.updateUser();

                expect(controller.updating).toBe(true);
                expect(UserService.updateUser).toHaveBeenCalledWith(controller.selected);

                deferUserUpdate.resolve({success: {updated: 1}});
                timeout.flush();

                expect(NotificationService.displaySuccess).toHaveBeenCalledWith('User updated successfully.');
                expect(controller.updating).toBe(false);
                expect(controller.editingUser).toBe(false);
                expect(controller.users.length).toBe(2);
                expect(controller.selected).toEqual(getUsers()[0]);
            });

            it('should handle the error accordingly', () => {
                resolveUsers();

                controller.updateUser();

                expect(controller.updating).toBe(true);
                expect(UserService.updateUser).toHaveBeenCalledWith(controller.selected);

                deferUserUpdate.reject({error: 'Error updating'});
                timeout.flush();

                expect(NotificationService.displayError).toHaveBeenCalledWith('Error updating User.');
                expect(controller.updating).toBe(false);
                expect(controller.editingUser).toBe(false);
                expect(controller.error).toBeDefined();
                expect(controller.users.length).toBe(2);
                expect(controller.selected).toEqual(getUsers()[0]);
            });
        });
    });
})();
