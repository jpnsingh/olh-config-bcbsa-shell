(function () {
    'use strict';

    describe('ConfigCtrl:', function () {
        var rootScope,
            scope,
            q,
            deferredUserService,
            deferredConfigService,
            _timeout,
            ConfigPlan,
            ConfigService,
            UserService,
            NotificationService,
            controller,
            groupData = [
                {_id: 'root', name: 'Root', config: {test: 'test'}, groupId: 1},
                {_id: 'bcbst', name: 'BCBST', config: {test: 'test'}, groupId: 2}
            ],
            newGroup = {_id: 'test', name: 'test', description: 'Test'},
            responseUserGroups = {
                groups: groupData
            };

        beforeEach(angular.mock.module('bcbsa-shell.configuration.controllers.ConfigurationController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, $controller) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            q = $q;
            deferredUserService = q.defer();
            deferredConfigService = q.defer();
            _timeout = $timeout;

            ConfigPlan = function () {
                this.planSetup = {};
                this.planAdditional = {};
                this.featurePool = {};
            };

            UserService = {
                getUserGroups: jasmine.createSpy().and.returnValue(deferredUserService.promise)
            };

            ConfigService = {
                getGroupConfig: jasmine.createSpy().and.returnValue(deferredConfigService.promise),
                cacheConfig: jasmine.createSpy(),
                updateConfig: jasmine.createSpy().and.returnValue(deferredConfigService.promise),
                newGroupConfig: jasmine.createSpy().and.returnValue(deferredConfigService.promise)
            };

            NotificationService = {
                displaySuccess: jasmine.createSpy(),
                displayError: jasmine.createSpy()
            };

            controller = $controller('ConfigCtrl as configCtrl', {
                $scope: scope,
                ConfigPlan: ConfigPlan,
                ConfigService: ConfigService,
                UserService: UserService,
                NotificationService: NotificationService
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.config).toBeDefined();
        });

        it('should initialize the user groups first and set first one from the list as selected an then initialize the group config accordingly', function () {
            expect(UserService.getUserGroups).toHaveBeenCalled();

            deferredUserService.resolve(responseUserGroups);
            _timeout.flush();

            expect(controller.userGroups).toBeDefined();
            expect(controller.selectedGroup).toEqual(responseUserGroups.groups[0]);

            expect(controller.loadingConfig).toBeTruthy();
            expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('root');

            deferredConfigService.resolve(groupData[0]);
            _timeout.flush();

            expect(controller.loadingConfig).toBeFalsy();
            expect(controller.planConfigured).toBe(true);
            expect(controller.config).toEqual(jasmine.objectContaining(groupData[0].config));
        });

        it('should error if user group promise is rejected', function () {
            expect(UserService.getUserGroups).toHaveBeenCalled();

            deferredUserService.reject([{message: 'Error initializing user groups.'}]);
            _timeout.flush();

            expect(controller.error).toBeDefined();
        });

        describe('changeGroup:', function () {
            it('should reinitialize the selected group', function () {
                controller.selectedGroup = groupData[1];
                controller.changeGroup();

                expect(controller.loadingConfig).toBeTruthy();
                expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('bcbst');

                deferredConfigService.resolve(groupData[1]);
                _timeout.flush();

                expect(controller.loadingConfig).toBeFalsy();
                expect(controller.planConfigured).toBe(true);
                expect(controller.config).toEqual(jasmine.objectContaining(groupData[1].config));
            });
        });

        describe('addPlan:', function () {
            it('should add a new plan in the list and make that selected and fetch the config for the same for edit ', function () {
                controller.userGroups = groupData;
                controller.plan = {name: 'Test', description: 'Test'};

                controller.addPlan();

                expect(controller.adding).toBe(true);

                deferredConfigService.resolve(newGroup);
                _timeout.flush();

                expect(controller.adding).toBe(false);
                expect(NotificationService.displaySuccess).toHaveBeenCalled();
                expect(controller.userGroups.length).toBe(3);
                expect(controller.selectedGroup).toEqual(newGroup);

                expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('test');
            });
        });

        describe('inheritFromRoot:', function () {
            it('should get the config from Root and initialize accordingly', function () {
                controller.inheritFromRoot();

                expect(controller.loadingConfig).toBe(true);
                expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('Root');

                deferredConfigService.resolve(groupData[0]);
                _timeout.flush();

                expect(controller.loadingConfig).toBe(false);
                // expect(controller.planConfigured).toBe(true);
                // expect(controller.config).toEqual(jasmine.objectContaining(groupData[0].config));
            });
        });

        describe('updatePlan:', function () {
            it('should update the selected plan and refresh accordingly on success', function () {
                controller.selectedGroup = groupData[1];

                controller.updatePlan();

                expect(rootScope.updatingPlan).toBe(true);

                deferredConfigService.resolve(groupData[1]);
                _timeout.flush();

                expect(NotificationService.displaySuccess).toHaveBeenCalled();
                expect(rootScope.updatingPlan).toBe(false);
                expect(controller.planConfigured).toBe(true);
                expect(controller.config).toEqual(jasmine.objectContaining(groupData[1].config));
            });

            it('should display error notification on failure', function () {
                controller.selectedGroup = groupData[1];

                controller.updatePlan();

                expect(rootScope.updatingPlan).toBe(true);

                deferredConfigService.reject([{message: 'Error'}]);
                _timeout.flush();

                expect(rootScope.updatingPlan).toBe(false);
                expect(controller.error).toBeDefined();
                expect(NotificationService.displayError).toHaveBeenCalled();
            });
        });
    });
})();
