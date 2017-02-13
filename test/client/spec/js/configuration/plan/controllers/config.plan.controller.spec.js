(function () {
    'use strict';

    describe('ConfigPlanCtrl:', function () {
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
            newGroup = {_id: 'test', name: 'test', description: 'Test'},
            responseUserGroups = {
                groups: getGroupData()
            };

        beforeEach(angular.mock.module('bcbsa-shell.configuration.plan.controllers.ConfigPlanController'));

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
                newGroupConfig: jasmine.createSpy().and.returnValue(deferredConfigService.promise),
                deleteGroupConfig: jasmine.createSpy().and.returnValue(deferredConfigService.promise)
            };

            NotificationService = {
                displayInfo: jasmine.createSpy('displayInfo'),
                displaySuccess: jasmine.createSpy('displaySuccess'),
                displayError: jasmine.createSpy('displayError')
            };

            controller = $controller('ConfigPlanCtrl as configPlanCtrl', {
                $scope: scope,
                ConfigPlan: ConfigPlan,
                ConfigService: ConfigService,
                UserService: UserService,
                NotificationService: NotificationService
            });
        }));

        it('should initialize the user groups first and set first one from the list as selected an then initialize the group config accordingly', function () {
            expect(UserService.getUserGroups).toHaveBeenCalled();

            deferredUserService.resolve(responseUserGroups);
            _timeout.flush();

            expect(controller.userGroups).toBeDefined();
            expect(controller.selectedGroup).toEqual(responseUserGroups.groups[0]);

            expect(controller.loadingConfig).toBeTruthy();
            expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('root');

            deferredConfigService.resolve(getGroupData()[0]);
            _timeout.flush();

            expect(controller.loadingConfig).toBeFalsy();
            expect(controller.planConfigured).toBe(true);
            expect(controller.config).toEqual(jasmine.objectContaining(getGroupData()[0].config));
        });

        it('should error if user group promise is rejected', function () {
            expect(UserService.getUserGroups).toHaveBeenCalled();

            deferredUserService.reject([{message: 'Error initializing user groups.'}]);
            _timeout.flush();

            expect(controller.error).toBeDefined();
        });

        it('should have the plan tabs defined with title, state and order for each of them', function () {
            expect(controller.tabs).toBeDefined();
            expect(controller.tabs.length).toBe(4);
            expect(controller.tabs[1].title).toBeDefined();
            expect(controller.tabs[1].state).toBeDefined();
            expect(controller.tabs[1].order).toBeDefined();
        });

        describe('changeGroup:', function () {
            it('should reinitialize the selected group', function () {
                controller.selectedGroup = getGroupData()[1];
                controller.changeGroup();

                expect(controller.loadingConfig).toBeTruthy();
                expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('bcbst');

                deferredConfigService.resolve(getGroupData()[1]);
                _timeout.flush();

                expect(controller.loadingConfig).toBeFalsy();
                expect(controller.planConfigured).toBe(true);
                expect(controller.config).toEqual(jasmine.objectContaining(getGroupData()[1].config));
            });
        });

        describe('newPlan:', function () {
            it('should allow config setup if the selected user group doesn\'t have a config setup', function () {
                controller.userGroups = getGroupData();
                controller.planConfigured = false;

                controller.newPlan();

                expect(controller.addingPlanConfig).toBeTruthy();
                expect(controller.planConfigured).toBeTruthy();
                expect(controller.config).toBeDefined();
                expect(ConfigService.cacheConfig).toHaveBeenCalled();
            });

            it('should allow the group/plan addition via a modal otherwise', function () {
                controller.userGroups = getGroupData();
                controller.planConfigured = true;

                controller.newPlan();

                expect(controller.addingPlanConfig).toBeFalsy();
            });
        });

        describe('addPlan:', function () {
            it('should add a new plan in the list and make that selected and fetch the config for the same for edit ', function () {
                controller.userGroups = getGroupData();
                controller.plan = {name: 'Test', description: 'Test'};

                controller.addPlan();

                expect(controller.addingPlan).toBe(true);

                deferredConfigService.resolve(newGroup);
                _timeout.flush();

                expect(controller.addingPlan).toBe(false);
                expect(NotificationService.displaySuccess).toHaveBeenCalled();
                expect(controller.userGroups.length).toBe(3);
                expect(controller.selectedGroup).toEqual(newGroup);

                expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('test');
            });
        });

        describe('inheritFromRoot:', function () {
            it('should get the config from Root and initialize accordingly and reset the planInfo to blank', function () {
                controller.inheritFromRoot();

                expect(controller.loadingConfig).toBe(true);
                expect(ConfigService.getGroupConfig).toHaveBeenCalledWith('Root');
                deferredConfigService.resolve(getGroupData()[0]);
                _timeout.flush();

                expect(controller.loadingConfig).toBe(false);
                expect(NotificationService.displayInfo).toHaveBeenCalledWith('Add a Plan Title and start configuring accordingly.');
                expect(controller.planConfigured).toBe(true);
                expect(controller.config).toBeDefined();
                expect(controller.config.planSetup.branding.planInfo.value).toEqual('');
            });
        });

        describe('updatePlan:', function () {
            it('should update the selected plan and refresh accordingly on success', function () {
                controller.selectedGroup = getGroupData()[1];

                controller.updatePlan();

                expect(rootScope.updatingPlan).toBe(true);

                deferredConfigService.resolve(getGroupData()[1]);
                _timeout.flush();

                expect(NotificationService.displaySuccess).toHaveBeenCalled();
                expect(rootScope.updatingPlan).toBe(false);
            });

            it('should display error notification on failure', function () {
                controller.selectedGroup = getGroupData()[1];

                controller.updatePlan();

                expect(rootScope.updatingPlan).toBe(true);

                deferredConfigService.reject([{message: 'Error'}]);
                _timeout.flush();

                expect(rootScope.updatingPlan).toBe(false);
                expect(controller.error).toBeDefined();
                expect(NotificationService.displayError).toHaveBeenCalled();
            });
        });

        describe('deletePlan:', function () {
            it('should delete the selected plan and refresh accordingly on success', function () {
                controller.userGroups = getGroupData();
                controller.selectedGroup = controller.userGroups[1];

                controller.deletePlan();

                expect(controller.updating).toBe(true);
                expect(ConfigService.deleteGroupConfig).toHaveBeenCalledWith('bcbst');

                deferredConfigService.resolve({success: {deleted: 1}});
                _timeout.flush();

                expect(NotificationService.displaySuccess).toHaveBeenCalledWith('Plan deleted successfully.');
                expect(controller.updating).toBe(false);
                expect(controller.selectedGroup).toEqual(controller.userGroups[0]);
            });

            it('should display error notification on failure', function () {
                controller.selectedGroup = getGroupData()[1];

                controller.deletePlan();

                expect(controller.updating).toBe(true);
                expect(ConfigService.deleteGroupConfig).toHaveBeenCalledWith('bcbst');

                deferredConfigService.reject({message: 'Error'});
                _timeout.flush();

                expect(controller.error.message).toEqual('Error');
                expect(controller.updating).toBe(false);
                expect(NotificationService.displayError).toHaveBeenCalledWith('Error deleting Plan.');
            });
        });
    });

    function getGroupData() {
        return [
            {
                _id: 'root',
                name: 'Root',
                config: {
                    planSetup: {
                        branding: {
                            planInfo: {
                                value: 'Plan A'
                            }
                        }
                    }
                },
                groupId: 1
            },
            {
                _id: 'bcbst',
                name: 'BCBST',
                config: {
                    planSetup: {
                        branding: {
                            planInfo: {
                                value: 'Plan B'
                            }
                        }
                    }
                },
                groupId: 2
            }
        ];
    }
})();
